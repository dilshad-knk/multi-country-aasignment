import { Request, Response ,CookieOptions} from 'express';
import { Types } from "mongoose";
import User from "../models/User"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const createUser = async (req: Request, res: Response) => {

  try {

    const { username ,email,country } = req.body;
    let {password} = req.body;

    const existingUser = await User.findOne({email});
    const existingName = await User.findOne({username});
    let role = 'viewer'

    if(existingUser || existingName  ){
      return  res
      .status(400)
      .json({error : "User already exists"})
    }

    if( email == process.env.SUPER_ADMIN_EMAIL) {
      password = process.env.SUPER_ADMIN_PWD
      role = 'admin'
    }


    const hashedpwd = await bcrypt.hash(password,10);

    const user = new User({
        username,
        email,
        password: hashedpwd,
        country,
        role
    })

    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.cookie('token', token)

    res.status(201).json({ message: 'user registered' });
    
  } catch (error) {
    res.status(500).json({ message: 'failed to register user', error });
  }

}




export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })



    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    let isValid ;

    if(user.role == "admin"){
      if (!process.env.SUPER_ADMIN_PWD) {
        throw new Error('SUPER_ADMIN_PWD environment variable is not defined');
      }
      
      isValid = await bcrypt.compare(process.env.SUPER_ADMIN_PWD, user.password);
      
    } else {
       isValid = await bcrypt.compare(password, user.password)

    }


    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credent' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    const cookieParams: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none" as "none",
      path: '/', 

    };

    res.cookie('token', token, cookieParams)

    const userData = {
      username : user.username,
      country : user.country,
      role : user.role
    }

    res.status(200).json({ message: 'access granted', token, user: userData });


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' })
  }
}













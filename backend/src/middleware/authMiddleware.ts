import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


export interface Request1 extends Request {
  userId?: string
}


export const verify = (req: Request1, res: Response, next: NextFunction) => {

  const token = req.cookies?.token;


  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }



  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decode: any) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!!",
        err
      })

    }

    const userId = decode.userId;




    req.userId = userId;



    next()


  })

}

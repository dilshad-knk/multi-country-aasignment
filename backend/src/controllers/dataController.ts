import { Response } from "express";
import Data from "../models/Data";
import User from "../models/User";
import { Request1 } from "../middleware/authMiddleware";
interface Task {
  title?: string;
  description?: string;
  priority?: string;
  deadline?: string;
  status?: string;
}

export const createData = async (req: Request1, res: Response) => {
  try {
    const userId = req.userId;

    const { title, description, createdBy, country } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "user not found" });

    if (user.role == "admin") {
      const data = new Data({
        title,
        description,
        createdBy: userId,
        country,
      });

      await data.save();

      res.status(201).json({
        success: true,
        message: 'Data created successfully',
        data
      });
    } else {
      res.status(401).json({ message: "Un authorized" });
    }
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: "error creatin Data" });
  }
};

export const editData = async (req: Request1, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, createdBy, country } = req.body;

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "user not found" });

    if (user.role == "admin") {
      const updatedData = await Data.findByIdAndUpdate(
        id,
        { title, description, createdBy: userId, country },
        { new: true, runValidators: true }
      );

      if (!updatedData) {
        return res.status(404).json({ error: "Data not found" });
      }

      res
        .status(200)
        .json({ message: "Data updated successfully", data: updatedData });
    } else {
      res.status(401).json({ message: "Un authorized" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update data", details: error });
  }
};

export const deleteData = async (req: Request1, res: Response) => {
  try {
    const { id } = req.params;

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "user not found" });

    if (user.role == "admin") {
      const deletedData = await Data.findByIdAndDelete(id);

      if (!deletedData) {
        return res.status(404).json({ error: "Data not found" });
      }
      res.status(200).json({ message: "Data deleted successfully" });
    } else {
      res.status(401).json({ message: "Un authorized" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete data", details: error });
  }
};

export const fetchDataByCountry = async (req: Request1, res: Response) => {
  try {
    const { country } = req.query;

    const userId = req.userId;

    const user = await User.findById(userId);

   
 

    const data = await Data.find({ country })
  .populate("createdBy", "username email country role"); 


    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data", details: error });
  }
};

export const fetchAll = async (req: Request1, res: Response) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (user?.role == "viewer") {
      return res
        .status(500)
        .json({ error: "Failed to fetch data", });
    }

    const data = await Data.find().populate("createdBy", "username");

    if (data.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data", details: error });
  }
};

export const logout = (req: Request1, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const changeCountry = async (req: Request1, res: Response) => {
  try {
    const { country } = req.params;

    const userId = req.userId;

    const user = await User.findById(userId);

 
    

    if (!user) return res.status(404).json({ error: "user not found" });

    if (user.role == "admin") {
      const updateUser = await User.findByIdAndUpdate(
        userId,
        {country },
        { new: true, runValidators: true }
      );



      if (!updateUser) {
        return res.status(404).json({ error: "Country not found" });
      }


      const userData = {
        username : updateUser.username,
        country : updateUser.country,
        role : updateUser.role
      }
      
      res
        .status(200)
        .json({ message: "User updated successfully", user: userData });
    } else {
      res.status(401).json({ message: "Un authorized" });
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to update data" });
  }
};

"use strict";
// import { Response } from "express";
// import Task from "../models/Task";
// import User from "../models/User"
// import { Request1 } from "../middleware/authMiddleware";
// interface Task {
//   title?: string;
//   description?: string;
//   priority?: string;
//   deadline?: string;
//   status?: string;
// }
// export const getTasks = async (req: Request1, res: Response) => {
//   const userId = req.userId
//   try {
//     const user = await User.findById(userId).populate('tasks').exec();
//     if (!user) {
//       throw new Error('User not hh found');
//     }
//     res.status(200).json({tasks: user.tasks});
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch personal boards',err });
//   }
//   };
// export  const createTask = async (req:Request1,res:Response)=>{
// console.log('hitted');
//     try {
//         const userId = req.userId
//         console.log(userId,'idididididididiid');
//         const{  title, description, priority, deadline, status } = req.body
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ error: 'user not found' });
//         const task = new Task({
//           user: userId,
//           title,
//           description,
//           priority,
//           deadline,
//           status,
//         });
//         const savedtask = await task.save();
//         user.tasks.push(savedtask._id);
//         await user.save();
//         res.status(201).json({message:'task created successfully'});
//     } catch (error) {
//         return res.status(500).json({error: "error creatin task"})
//     }
// }
// export const updateTask = async (req:Request1,res:Response) => {
//   const { taskId } = req.params;
//   const updateData = req.body;
//   try {
//     const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
//       new: true, 
//       runValidators: true, 
//     });
//     if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
//     return res.status(200).json({message: 'task updated successfully',task : updateTask});
//   } catch (error) {
//     return res.status(500).json({ error: 'Error updating task', });
//   }
// };
// export const deleteTask = async (req:Request1,res:Response) => {
//   const { taskId } = req.params;
//    const userId = req.userId
//   console.log(taskId,'id');
//   console.log(userId,'user');
//   try {
//     const task = await Task.findById(taskId);
//     if (!task) return res.status(404).json({ error: 'Task not found' });
// console.log(task.user.toString() );
//     if (task.user.toString() !== userId) {
//       return res.status(403).json({ error: 'User does not have permission to delete this task' });
//     }
//     await Task.findByIdAndDelete(taskId);
//     await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });
//     return res.status(200).json({message:'Deleted Successfully'});
//   } catch (error) {
//     return res.status(500).json({ error: 'Error updating task', });
//   }
// };

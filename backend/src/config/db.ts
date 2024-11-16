import mongoose from 'mongoose';
import dotenv from 'dotenv';

// dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB as string);
        console.log("Db connected");
        
    } catch (error) {
        console.error(error);
    }
}

export default connectDb;
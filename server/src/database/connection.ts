import mongoose from "mongoose";
import {config} from 'dotenv'

config()

export const connectDB = async () => {
    const connectionString = process.env.MONGO_URI;
    try {
        console.info("Connecting to database..." + connectionString);
        await mongoose.connect(connectionString!);
        console.info("Database connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
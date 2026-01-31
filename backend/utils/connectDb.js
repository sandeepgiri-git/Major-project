import mongoose from "mongoose";
import cron from "node-cron";
import { updateStatus } from "./cronSchedular/updateStatus.js";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected successfully")
        cron.schedule("* * * * *", updateStatus);
    }catch(e){
        console.log("Connection failed", e);
        process.exit(1)
    }
}
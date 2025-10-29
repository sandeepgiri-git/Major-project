import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected successfully")
    }catch(e){
        console.log("Connection failed", e);
        process.exit(1)
    }
}
import mongoose from "mongoose";

//function to connect to database
export const connectDB = async()=>{
    try {
        mongoose.connection.on("connected", ()=>console.log("DB connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/yapyap`);
    } catch (error) {
        console.log(error);
        
    }
}
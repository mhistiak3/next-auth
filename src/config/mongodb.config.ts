import mongoose from "mongoose";

export default async function connectDB  () {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
       const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB") 
        })
        connection.on("error",(error)=>{
            console.log("Error connecting to MongoDB: ", error);
            process.exit(1)
        })
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
};
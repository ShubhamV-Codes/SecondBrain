import mongoose from "mongoose";
export const connectDB = () =>{
    try{
        mongoose.connect(process.env.MONGO_URI!);
        console.log("DB Connected")
    }catch(e){
       console.log("DO Connection Failed", e)
    }
}
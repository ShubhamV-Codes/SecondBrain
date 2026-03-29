import {UserModel} from "../schema/userSchema.js"
import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_PASS = process.env.JWT_PASS!;


router.post("/signin", async(req, res)=>{
 try{
    const{username, password}=req.body;
    const existingUser = await UserModel.findOne({username});

    if(!existingUser){
         return res.status(403).json({
         message:"User not found!"
        })
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch){
        return res.status(403).json({message:"Invalid Password"});
    }
    const token = jwt.sign({
        id:existingUser._id}, JWT_PASS);

        res.json({token});
    }
    catch(e){
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
});

export default router ;
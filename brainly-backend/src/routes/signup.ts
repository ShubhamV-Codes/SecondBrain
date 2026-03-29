import express from "express";
import bcrypt from "bcrypt";
import {UserModel} from "../schema/userSchema.js"
import {signupSchema} from "../validations/user.js"

const router = express.Router();

router.post("/signup", async (req, res)=>{

  // Here I am Validating Input Via ZOD

  const result = signupSchema.safeParse(req.body);

if(!result.success){
    return res.status(400).json({message:"Invalid Input"})
}

const {username, password}=result.data;

// Checks if same-user Exists

const existingUser = await UserModel.findOne({username});

if(existingUser){
   return res.status(409).json({message:"User already exists"});
}

//Hashing Password 10 times

const hashedPassword = await bcrypt.hash(password, 10);

//Now Save to DB

await UserModel.create({
    username, 
    password:hashedPassword
})

  res.json({
        message:"User Created"
  })
    
});

export default router ;
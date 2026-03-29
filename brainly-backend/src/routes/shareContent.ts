import { randomBytes } from "crypto";
import {ShareModel} from "../schema/shareSchema.js"
import express from "express";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const router = express.Router();

router.post("/", async(req, res)=>{
    try{
     const {share} = req.body;
     //@ts-ignore
     const userId = req.userId;

     // Guard-> Only Accepts the boolean Value
     if(share !== true && share !== false){
        return res.status(400).json({
            success:false,
            message:"Invalid Share Value"
        });
     }

     let existing = await ShareModel.findOne({userId});

     // Create if not exists
    if(!existing){
        if(!share){
            return res.json({
                success:true,
                message:"Already not shared"
            })
        }
        const hash = randomBytes(10).toString("hex");

        existing = await ShareModel.create({
            userId, 
            hash, 
            isShared:true
        });  
    }else{
        // toggle state
        existing.isShared = share;

        //Generate Hash if Missing(Edge-Case)

        if(share && !existing.hash){
            existing.hash=randomBytes(10).toString("hex");
        }
        await existing.save();
    }

    if(!share){
        return res.json({
            success:true,
            message:"Sharing Disabled"
        });
    }
    // If ON - Return Link
    
return res.status(200).json({
  success: true,
  data: {
    shareLink: `${FRONTEND_URL}/brain/${existing.hash}`
  }
});
}catch(e){
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
}
});

export default router;
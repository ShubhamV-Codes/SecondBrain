import {ContentModel} from "../schema/contentSchema.js"
import express from "express";
const router = express.Router();

router.post("/content", async(req,res)=>{
    try{
     const {link,title}=req.body;
     await ContentModel.create({
         title ,
        link, 
        tags:[],
        //@ts-ignore // Because We'll get userId from Middleware
        userId:req.userId,
    })
    return res.status(200).json({
        message:"Content Added"
    })
}catch(e){
    console.log(e);
    return res.status(500).json({
        message:"Error While Handling Content"
    });
}
 
});

export default router;
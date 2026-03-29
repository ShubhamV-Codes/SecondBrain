import {ShareModel} from "../schema/shareSchema.js"
import {ContentModel} from "../schema/contentSchema.js"

import express from "express";
const router = express.Router();

router.get("/:shareLink", async(req, res)=>{
    try{
        const{shareLink}=req.params;

        if(!shareLink || shareLink.length <10){
            return res.status(400).json({
                success:false,
                message:"Invalid link"
            })
        }
         
        const share = await ShareModel.findOne({
            hash:shareLink,
            isShared:true
        }).select("userId expiresAt");

        if(!share){
            return res.status(404).json({
                success:false,
                message:"Link is Invalid or disabled"
            })
        }

        // Check if link present and it expires or not

        if(share.expiresAt && share.expiresAt < new Date()){
            return res.status(403).json({
                success:false,
                message:"Link Expired"
            });
        }

        const content = await ContentModel.find({
            userId:share.userId
        }).sort({_id: -1}).limit(50).lean();

        return res.json({
            success:true,
            data:{
                content,
                count:content.length
            }
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
})

export default router;
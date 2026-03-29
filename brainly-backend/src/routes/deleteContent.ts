import express from "express";
const router = express.Router();
import {ContentModel} from "../schema/contentSchema.js"

router.delete("/", async(req, res)=>{
    try{
     const contentId = req.body.contentId;
     const result = await ContentModel.deleteOne({
        _id:contentId,
        //@ts-ignore
        userId:req.userId
     });
    if(result.deletedCount===0){
        return res.status(404).json({
            message:"Content not found or unauthorized to Delete"
        });
    }
    return res.status(200).json({
        message:"Content Deleted Successfully"
    })

    }
    catch(e){
        console.log("Error Occured", e);
        return res.status(500).json({
            message:"EInternal Server Error"
        })
    }
});

export default router;
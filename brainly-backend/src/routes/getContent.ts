import {ContentModel} from "../schema/contentSchema.js"
import express from "express";
const router = express.Router();

router.get("/content", async(req ,res)=>{
    //@ts-ignore
    const userId = req.userId;
    try{
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId", "username");
    res.json({
        content:content
    })
}catch(e){
    console.log("Error Caught While Rendering Content with userID", e);
    return res.status(500).json({
        message:"Internal Server Error While Fetching Content"
    });
}
});
export default router;
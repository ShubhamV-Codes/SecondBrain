import { ContentModel } from "../schema/contentSchema.js"
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  try {
    const content = await ContentModel.find({ userId });
    return res.json({ content });
  } catch (e) {
    console.log("Error fetching content", e);
    return res.status(500).json({
      message: "Internal Server Error While Fetching Content"
    });
  }
});

export default router;
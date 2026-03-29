import { ContentModel } from "../schema/contentSchema.js";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { link, title, type } = req.body; // ← destructure type

    await ContentModel.create({
      title,
      link,
      type,  // ← save type
      tags: [],
      //@ts-ignore
      userId: req.userId,
    });

    return res.status(200).json({
      message: "Content Added",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Error While Handling Content",
    });
  }
});

export default router;
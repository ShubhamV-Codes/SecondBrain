import "dotenv/config";
import express from "express";
import cors from "cors";
import { userMiddleware } from "./middleware.js";
import { connectDB } from "./db.js";
import userSignupRouter from "./routes/signup.js";
import userSigninRouter from "./routes/signin.js";
import postContentRouter from "./routes/postContent.js";
import getContentRouter from "./routes/getContent.js";
import deleteContentRouter from "./routes/deleteContent.js";
import shareContentRouter from "./routes/shareContent.js";
import contentLinkRouter from "./routes/contentLink.js";

const PORT = process.env.PORT || 3000;

const app = express();

// ✅ cors first, before everything
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/v1", userSignupRouter);
app.use("/api/v1", userSigninRouter);
app.use("/api/v1/content", userMiddleware, postContentRouter);
app.use("/api/v1/content", userMiddleware, getContentRouter);
app.use("/api/v1/delete", userMiddleware, deleteContentRouter);
app.use("/api/v1/brain/share", userMiddleware, shareContentRouter);
app.use("/api/v1/brain", contentLinkRouter);

app.listen(PORT, () => {
    console.log(`Server Started locally on the port: ${PORT}`);
});
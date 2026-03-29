import "dotenv/config";
import express from "express";
import {userMiddleware} from "./middleware.js";
import {connectDB} from "./db.js";

import userSignupRouter from "./routes/signup.js";
import userSigninRouter from "./routes/signin.js";
import postContentRouter from "./routes/postContent.js";
import getContentRouter from "./routes/getContent.js";
import deleteContentRouter from "./routes/deleteContent.js";
import shareContentRouter from "./routes/shareContent.js";
import contentLinkRouter from "./routes/contentLink.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

connectDB();

app.use("/api/v1", userSignupRouter);

app.use("/api/v1", userSigninRouter);

app.use("/api/v1", userMiddleware, postContentRouter);

app.use("/api/v1", userMiddleware, getContentRouter);

app.use("/api/v1",userMiddleware, deleteContentRouter);

app.use("/api/v1/brain", userMiddleware, shareContentRouter);

app.use("/api/v1/brain",contentLinkRouter);

app.listen(PORT,()=>{
    console.log(`Server Started locally on the port: ${PORT}`)
});
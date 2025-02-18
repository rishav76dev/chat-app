import express from "express";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";

import messageRoutes from "./routes/message.routes.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookiesParser());


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(5000,() => {
    console.log("server is running at 5001")
});
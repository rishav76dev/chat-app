import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.route.js";
import cors from "cors";
import { app,server}from "./lib/socket.js";
dotenv.config();



const PORT = process.env.PORT 


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}
));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server is running at PORT:" + PORT);
    });
  })
  .catch(err => {
    console.log("Failed to connect to MongoDB", err);
  });
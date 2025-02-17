import express from "express";

import dotenv from "dotenv";


const app = express();

import authRoutes from "./routes/auth.routes.js";

dotenv.config();


app.use(express.json());

app.listen(5000,() => {
    console.log("server is running at 5001")
});
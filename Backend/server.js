import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import projectRouter from "./routes/project.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import loginRouter from "./routes/auth.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* ===== DB CONNECTION (SERVERLESS SAFE) ===== */
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB connection failed:", err);
        res.status(500).json({ message: "Database unavailable" });
    }
});

/* ===== ROUTES ===== */
app.use("/", loginRouter);
app.use("/project", projectRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);

/* ===== HEALTH ===== */
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

export default app;

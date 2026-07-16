import express from "express";
import cors from "cors";
import authRoutes from "../src/features/auth/auth.routes.js";
import errorMiddleware from "../src/middlewares/error.middleware.js";
import repositoryRoutes from "./features/repository/repository.routes.js";
import aiRoutes from "./features/ai/ai.routes.js";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            process.env.CLIENT_URL,
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/repositories", repositoryRoutes);
app.use("/api/ai", aiRoutes);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "RepoLens API Running 🚀",
    });
});

app.use(errorMiddleware);

export default app;
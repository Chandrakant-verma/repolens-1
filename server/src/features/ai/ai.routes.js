import express from "express";

import { askQuestion } from "./ai.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/ask",
    authMiddleware,
    askQuestion
);

export default router;
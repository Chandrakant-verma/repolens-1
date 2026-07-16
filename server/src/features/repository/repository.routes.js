import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";

import {
    cloneRepository,
    getRepositories,
    getRepositoryById,
} from "./repository.controller.js";

const router = express.Router();

router.get(
    "/:id",
    authMiddleware,
    getRepositoryById
);

router.post(
    "/clone",
    authMiddleware,
    cloneRepository
);

router.get(
    "/",
    authMiddleware,
    getRepositories
);

export default router;
import jwt from "jsonwebtoken";

import User from "../features/auth/auth.model.js";
import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";

const authMiddleware = async (req, res, next) => {
    try {
              console.log("Authorization Header:", req.headers.authorization);

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized");
        }

        

        const token = authHeader.split(" ")[1];

        console.log("Token:", token);

        const decoded = jwt.verify(token, env.JWT_SECRET);

        console.log("Decoded:", decoded);

        const user = await User.findById(decoded.id);

        if (!user) {
            throw new ApiError(401, "User not found.");
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;
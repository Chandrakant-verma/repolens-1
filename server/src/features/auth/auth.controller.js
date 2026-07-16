import authService from "./auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body);

         console.log("Service Finished");

        return res
            .status(201)
            .json(ApiResponse.success("User registered successfully.", result));
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);

        return res
            .status(200)
            .json(ApiResponse.success("Login successful.", result));
    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await authService.getCurrentUser(req.user.id);

        return res
            .status(200)
            .json(ApiResponse.success("User fetched successfully.", user));
    } catch (error) {
        next(error);
    }
};
import validator from "validator";
import ApiError from "../../utils/ApiError.js";

export const validateRegister = ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required.");
    }

    if (name.trim().length < 3) {
        throw new ApiError(400, "Name must be at least 3 characters.");
    }

    if (!validator.isEmail(email)) {
        throw new ApiError(400, "Invalid email address.");
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters.");
    }
};

export const validateLogin = ({ email, password }) => {
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    if (!validator.isEmail(email)) {
        throw new ApiError(400, "Invalid email address.");
    }
};
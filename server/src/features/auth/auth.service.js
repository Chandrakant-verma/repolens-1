import User from "./auth.model.js";
import ApiError from "../../utils/ApiError.js";
import { validateRegister, validateLogin } from "./auth.validation.js";

class AuthService {

    async register(userData) {

        validateRegister(userData);

        const { name, email, password } = userData;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ApiError(409, "Email already registered.");
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        

        const token = user.generateToken();

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                // avatar: user.avatar,
            },
        };
    }

    async login(loginData) {

        validateLogin(loginData);

        const { email, password } = loginData;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new ApiError(401, "Invalid email or password.");
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid email or password.");
        }

        const token = user.generateToken();

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                // avatar: user.avatar,
            },
        };
    }

    async getCurrentUser(userId) {

        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        return user;
    }
}

export default new AuthService();
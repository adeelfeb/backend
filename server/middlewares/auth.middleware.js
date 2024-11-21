import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        console.log("Inside the authMiddleware");
        console.log("Token from cookies:", req.cookies?.accessToken);
        console.log("Token from headers:", req.header("Authorization"));

        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Token not provided");
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find user in the database
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid token");
        }

        // Attach user to request object
        req.user = user;

        next(); // Proceed to the next middleware
    } catch (error) {
        console.log("Error with the authmiddleware");
        // Pass the error to the error handling middleware
        next(new ApiError(401, error.message || "Invalid Access Token"));
    }
};

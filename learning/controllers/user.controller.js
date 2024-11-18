import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // Destructuring the incoming data from req.body
    const { fullname, email, password, username } = req.body;

    // To check for the special empty space character
    const removeInvisibleChars = (str) => {
        return str.replace(
            /[\u200B\u200C\u200E\u200F\u202A-\u202E\u2060\u2061\u2062\u2063\u2064\u2065\u2066\u2067\u2068\u2069\u206A-\u206F\u200D\u200C\u200B\u202F\u205F\u3000\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u200C\u200D\uFEFF]/g,
            ""
        );
    };

    // Ensure all fields are filled
    if ([fullname, email, password, username].some((field) => removeInvisibleChars(field)?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User Already exists");
    }

    // Ensure avatar is present in req.files
    if (!req.files?.avatar || !req.files.avatar[0]?.path) {
        throw new ApiError(400, "Avatar is required");
    }

    // Get avatar and coverImage from req.files (if provided)
    const avatarLocalPath = req.files.avatar[0].path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path || null;

    // Upload avatar to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // Upload cover image to Cloudinary if present
    let coverImageUrl = "";
    if (coverImageLocalPath) {
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);
        coverImageUrl = coverImage?.url || "";
    }

    // Create user in the database
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImageUrl,
        email,
        password,
        username: username.toLowerCase(),
    });

    // Fetch the created user without sensitive fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Log user details for testing
    console.log("Email received is:", createdUser.email);
    console.log("Full Name received is:", createdUser.fullname);
    console.log("Username received is:", createdUser.username);

    // Send a successful response
    return res.status(201).json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export { registerUser };

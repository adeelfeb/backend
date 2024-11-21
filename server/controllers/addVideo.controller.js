import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addVideo = asyncHandler(async (req, res) => {
    const videoUrl = req.body.videoUrl;
    const userId = req.user._id; // Assuming `req.user` is populated by a middleware like `verifyJWT`
    console.log(videoUrl)
    if (!videoUrl) {
        throw new ApiError(400, "Please provide a valid video URL");
    }

    // Check if the video exists in the database
    let video = await Video.findOne({ videoUrl });

    if (!video) {
        // Video doesn't exist, create a new video entry
        video = new Video({ videoUrl });

        // Fetch video details (from YouTube or another source)
        await video.fetchVideoDetails();

        // Save the new video to the database
        await video.save();
    }

    // Fetch the user from the database
    const user = await User.findById(userId).populate("watchHistory");
    // console.log(user.watchHistory); 

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if the video is already in the user's watch history
    const alreadyInHistory = user.watchHistory.some(
        (historyItem) => historyItem.videoUrl === videoUrl
    );

    if (alreadyInHistory) {
        return res.status(200).json(
            new ApiResponse(
                201,video, "Video already in watch history",
                
            ));
    }

    // Add the video to the user's watch history
    user.watchHistory.push(video._id);
    await user.save();

    res.status(201).json(
        new ApiResponse(
            201, 
            video, 
            "Video added successfully and included in watch history",
            
        )
    );
});

export { addVideo };

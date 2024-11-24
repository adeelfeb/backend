import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";


const getWatchHistory = asyncHandler(async (req, res) => {
    try {
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.user._id),
                },
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "watchHistory",
                    foreignField: "_id",
                    as: "watchHistory",
                },
            },
            {
                $project: {
                    watchHistory: 1, // Only include watchHistory field
                },
            },
        ]);

        if (!user || !user.length) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(
            new ApiResponse(200, user[0].watchHistory, "Watch History Fetched Successfully")
        );
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch watch history", error });
    }
});


const addVideo = asyncHandler(async (req, res) => {
    const videoUrl = req.body.videoUrl;
    const userId = req.user._id; // Assuming `req.user` is populated by a middleware like `verifyJWT`
  
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


const getTranscript = asyncHandler(async (req, res) => {
    const videoId = req.body.videoId || req.params; // Assuming videoId is passed as a URL parameter
  
    if (!videoId) {
      throw new ApiError(400, "Video ID is required.");
    }
  
    // Find the video by its ID
    const video = await Video.findById(videoId);
  
    if (!video) {
      throw new ApiError(404, "Video not found.");
    }
  
    // Extract the transcript (default to English for this example)
    const transcript = video.transcript || {};
  
    // If you want to return specific language, you can modify it like this:
    // const { english, hindi, urdu } = video.transcript;
    // In this case, you would return a specific one based on query parameter or user choice.
  
    return res.status(200).json(
      new ApiResponse(200, { transcript: transcript }, "Transcript fetched successfully")
    );
  });


  const getSummary = asyncHandler(async (req, res) => {
    const videoId = req.body.videoId || req.params;// Assuming videoId is passed as a URL parameter
  
    if (!videoId) {
      throw new ApiError(400, "Video ID is required.");
    }
  
    // Find the video by its ID
    const video = await Video.findById(videoId);
  
    if (!video) {
      throw new ApiError(404, "Video not found.");
    }
  
    // Extract the summary (default to English for this example)
    const summary = video.summary || {};
  
    return res.status(200).json(
      new ApiResponse(200, { summary: summary }, "Summary fetched successfully")
    );
  });




  const getQnas = asyncHandler(async (req, res) => {
    const videoId = req.body.videoId || req.params; // Assuming videoId is passed as a URL parameter
  
    if (!videoId) {
      throw new ApiError(400, "Video ID is required.");
    }
  
    // Find the video by its ID
    const video = await Video.findById(videoId);
  
    if (!video) {
      throw new ApiError(404, "Video not found.");
    }
  
    // Extract the QnAs (both short questions and MCQs)
    const qnas = video.qnas || {};
  
    return res.status(200).json(
      new ApiResponse(200, { qnas: qnas }, "QnAs fetched successfully")
    );
  });



export{
    getWatchHistory,
    addVideo,
    getTranscript,
    getSummary,
    getQnas
}
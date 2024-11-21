import mongoose, { Schema } from "mongoose";
import ytdl from 'ytdl-core'; // Import ytdl-core library

const videoSchema = new Schema(
  {
    videoUrl: {
      type: String,
      required: true,
      unique: true
    },
    videoDetails: {  // New field to store complete video details
            type: Object,
    },
    thumbnailUrl: {
      type: String,
    },
    title: {
      type: String,
    },
    duration: {
      type: String,  // Store duration as a string in minutes:seconds format
    },
    transcript: {
      english: { type: String, default: "Not yet provided" },
      hindi: { type: String, default: "Not yet provided" },
      urdu: { type: String, default: "Not yet provided" },
    },
    summary: {
      english: { type: String, default: "Not yet provided" },
      hindi: { type: String, default: "Not yet provided" },
      urdu: { type: String, default: "Not yet provided" },
    },
    qnas: {
      shortQuestions: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      mcqs: [
        {
          question: { type: String, required: true },
          options: [{ type: String, required: true }],
          correctAnswer: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

// Helper Method to fetch video details
videoSchema.methods.fetchVideoDetails = async function () {
  // Use ytdl-core to fetch video details directly from the URL
  const videoData = await getYouTubeVideoDetails(this.videoUrl);
  this.videoDetails = videoData.videoDetails
  this.thumbnailUrl = videoData.thumbnailUrl;
  this.title = videoData.title;
  this.duration = videoData.duration;

  return this.save();
};

// Helper function to get YouTube video details using ytdl-core
const getYouTubeVideoDetails = async (url) => {
  try {
    // Fetch the video info using ytdl-core directly from the full YouTube URL
    const info = await ytdl.getInfo(url);
    const videoDetails = info.videoDetails
    // Extract video details from the info
    const thumbnailUrl = info.videoDetails.thumbnails[0].url; // Get the highest quality thumbnail
    const title = info.videoDetails.title; // Video title
    const durationInSeconds = info.videoDetails.lengthSeconds; // Video duration in seconds

    // Convert duration from seconds to minutes:seconds format
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format as minutes:seconds

    return {
      videoDetails,
      thumbnailUrl,
      title,
      duration, // Duration in minutes:seconds format
    };
  } catch (error) {
    throw new Error('Error fetching video details: ' + error.message);
  }
};

export const Video = mongoose.model("Video", videoSchema);

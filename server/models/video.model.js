import mongoose, { Schema } from "mongoose";
import ytdl from "ytdl-core"; // Import ytdl-core library

const videoSchema = new Schema(
  {
    videoUrl: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnailUrl: { type: String },
    title: { type: String },
    duration: { type: String }, // Store duration as a string in minutes:seconds format
    transcript: {
      english: { type: String, default: "NA" },
      hindi: { type: String, default: "NA" },
      urdu: { type: String, default: "NA" },
    },
    summary: {
      english: { type: String, default: "NA" },
      hindi: { type: String, default: "NA" },
      urdu: { type: String, default: "NA" },
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
  const videoData = await getYouTubeVideoDetails(this.videoUrl);
  this.thumbnailUrl = videoData.thumbnailUrl;
  this.title = videoData.title;
  this.duration = videoData.duration;

  return this.save();
};

// Helper function to get YouTube video details using ytdl-core
const getYouTubeVideoDetails = async (url) => {
  try {
    // Ensure the URL is correctly formatted
    if (!/^https:\/\/www\.youtube\.com\/watch\?v=/.test(url)) {
      throw new Error("Invalid YouTube URL: " + url);
    }

    // Fetch video info using ytdl-core
    const info = await ytdl.getInfo(url);
    const thumbnailUrl = info.videoDetails.thumbnails[0].url;
    const title = info.videoDetails.title;
    const durationInSeconds = info.videoDetails.lengthSeconds;

    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const duration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    return { thumbnailUrl, title, duration };
  } catch (error) {
    throw new Error("Error fetching video details: " + error.message);
  }
};


export const Video = mongoose.model("Video", videoSchema);

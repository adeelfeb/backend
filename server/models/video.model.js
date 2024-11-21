// import mongoose, { Schema } from "mongoose";

// const videoSchema = new Schema(
//   {
//     videoUrl: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     thumbnailUrl: {
//       type: String,
//     },
//     title: {
//       type: String,
//     },
//     duration: {
//       type: Number,
//     },
//     transcript: {
//       english: { type: String },
//       hindi: { type: String },
//       urdu: { type: String },
//     },
//     summary: {
//       english: { type: String },
//       hindi: { type: String },
//       urdu: { type: String },
//     },
//     qnas: {
//         shortQuestions: [
//           {
//             question: { type: String, required: true },
//             answer: { type: String, required: true },
//           },
//         ],
//         mcqs: [
//           {
//             question: { type: String, required: true },
//             options: [{ type: String, required: true }],
//             correctAnswer: { type: String, required: true },
//           },
//         ],
//       },
      
//   },
//   { timestamps: true }
// );


// // Helper Methods
// videoSchema.methods.fetchVideoDetails = async function () {
//   const videoId = extractYouTubeVideoId(this.videoUrl);
//   if (!videoId) throw new Error("Invalid YouTube URL");

//   const videoData = await fetchYouTubeVideoDetails(videoId);

//   this.thumbnailUrl = videoData.thumbnailUrl;
//   this.title = videoData.title;
//   this.duration = videoData.duration;

//   return this.save();
// };

// // Helper Function to Extract YouTube Video ID
// const extractYouTubeVideoId = (url) => {
//   const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&\s]+)|youtu\.be\/([^&\s]+)/;
//   const match = url.match(regex);
//   return match ? match[1] || match[2] : null;
// };

// // Helper Function to Fetch YouTube Details
// const fetchYouTubeVideoDetails = async (videoId) => {
//   const apiKey = process.env.YOUTUBE_API_KEY; // Store your YouTube API key in an environment variable
//   const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${apiKey}`;

//   const response = await fetch(apiUrl);
//   const data = await response.json();

//   if (!data.items || data.items.length === 0) {
//     throw new Error("Video not found on YouTube");
//   }

//   const video = data.items[0];
//   return {
//     thumbnailUrl: video.snippet.thumbnails.high.url,
//     title: video.snippet.title,
//     duration: parseYouTubeDuration(video.contentDetails.duration),
//   };
// };

// // Helper Function to Parse YouTube Duration (ISO 8601 Format)
// const parseYouTubeDuration = (duration) => {
//   const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
//   const matches = duration.match(regex);

//   const hours = matches[1] ? parseInt(matches[1].replace("H", "")) : 0;
//   const minutes = matches[2] ? parseInt(matches[2].replace("M", "")) : 0;
//   const seconds = matches[3] ? parseInt(matches[3].replace("S", "")) : 0;

//   return hours * 3600 + minutes * 60 + seconds;
// };

// export const Video = mongoose.model("Video", videoSchema);



// import mongoose, { Schema } from "mongoose";

// const videoSchema = new Schema(
//   {
//     videoUrl: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     thumbnailUrl: {
//       type: String,
//     },
//     title: {
//       type: String,
//     },
//     duration: {
//       type: Number,
//     },
//     transcript: {
//       english: { type: String },
//       hindi: { type: String },
//       urdu: { type: String },
//     },
//     summary: {
//       english: { type: String },
//       hindi: { type: String },
//       urdu: { type: String },
//     },
//     qnas: {
//       shortQuestions: [
//         {
//           question: { type: String, required: true },
//           answer: { type: String, required: true },
//         },
//       ],
//       mcqs: [
//         {
//           question: { type: String, required: true },
//           options: [{ type: String, required: true }],
//           correctAnswer: { type: String, required: true },
//         },
//       ],
//     },
//   },
//   { timestamps: true }
// );

// // Helper Method to fetch video details
// videoSchema.methods.fetchVideoDetails = async function () {
//   const videoId = extractYouTubeVideoId(this.videoUrl);
  
//   if (!videoId) throw new Error("Invalid YouTube URL");
  
//   // Use the extracted videoId to generate the thumbnail, title, and duration
//   const videoData = getYouTubeVideoDetails(videoId);

//   this.thumbnailUrl = videoData.thumbnailUrl;
//   this.title = videoData.title;
//   this.duration = videoData.duration;

//   return this.save();
// };

// // Helper function to extract YouTube Video ID
// const extractYouTubeVideoId = (url) => {
//   const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&\s]+)|youtu\.be\/([^&\s]+)/;
//   const match = url.match(regex);
//   return match ? match[1] || match[2] : null;
// };

// // Helper function to get YouTube video details (mocked version)
// const getYouTubeVideoDetails = (videoId) => {
//   // Use the YouTube video ID to generate the thumbnail URL, title, and duration
//   const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;  // Thumbnail URL
//   const title = `Video Title for ${videoId}`; // This would ideally be scraped or extracted
//   const duration = 180; // Mock duration in seconds (3 minutes). You can replace this with logic to scrape duration.

//   return {
//     thumbnailUrl,
//     title,
//     duration,
//   };
// };

// export const Video = mongoose.model("Video", videoSchema);


// import mongoose, { Schema } from "mongoose";
// import ytdl from 'ytdl-core'; // Import ytdl-core library

// const videoSchema = new Schema(
//   {
//     videoUrl: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     thumbnailUrl: {
//       type: String,
//     },
//     title: {
//       type: String,
//     },
//     duration: {
//       type: Number,
//     },
//     transcript: {
//       english: { type: String },
//       hindi: { type: String },
//       urdu: { type: String },
//     },
//     summary: {
//       english: { type: String },
//       hindi: { type: String },
//       urdu: { type: String },
//     },
//     qnas: {
//       shortQuestions: [
//         {
//           question: { type: String, required: true },
//           answer: { type: String, required: true },
//         },
//       ],
//       mcqs: [
//         {
//           question: { type: String, required: true },
//           options: [{ type: String, required: true }],
//           correctAnswer: { type: String, required: true },
//         },
//       ],
//     },
//   },
//   { timestamps: true }
// );

// // Helper Method to fetch video details
// videoSchema.methods.fetchVideoDetails = async function () {
//   const videoId = extractYouTubeVideoId(this.videoUrl);
  
//   if (!videoId) throw new Error("Invalid YouTube URL");
  
//   // Use ytdl-core to fetch video details (title, thumbnail, and duration)
//   const videoData = await getYouTubeVideoDetails(videoId);

//   this.thumbnailUrl = videoData.thumbnailUrl;
//   this.title = videoData.title;
//   this.duration = videoData.duration;

//   return this.save();
// };

// // Helper function to extract YouTube Video ID
// const extractYouTubeVideoId = (url) => {
//   const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&\s]+)|youtu\.be\/([^&\s]+)/;
//   const match = url.match(regex);
//   return match ? match[1] || match[2] : null;
// };

// // Helper function to get YouTube video details using ytdl-core
// const getYouTubeVideoDetails = async (videoId) => {
//   try {
//     // Fetch the video info using ytdl-core
//     const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
//     console.log(info)
//     // Extract video details from the info
//     const thumbnailUrl = info.videoDetails.thumbnails[0].url; // Get the highest quality thumbnail
//     const title = info.videoDetails.title; // Video title
//     const duration = info.videoDetails.lengthSeconds; // Video duration in seconds

//     return {
//       thumbnailUrl,
//       title,
//       duration,
//     };
//   } catch (error) {
//     throw new Error('Error fetching video details: ' + error.message);
//   }
// };

// export const Video = mongoose.model("Video", videoSchema);



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
      english: { type: String },
      hindi: { type: String },
      urdu: { type: String },
    },
    summary: {
      english: { type: String },
      hindi: { type: String },
      urdu: { type: String },
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




// import mongoose, { Schema } from "mongoose";
// import ytdl from 'ytdl-core'; // Import ytdl-core library

// const videoSchema = new Schema(
//   {
//     videoUrl: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     thumbnailUrl: {
//       type: String,
//     },
//     title: {
//       type: String,
//     },
//     duration: {
//       type: String,  // Store duration as a string in minutes:seconds format
//     },
//     videoDetails: {  // New field to store complete video details
//       type: Object,
//     },
//     transcript: {
//       english: { type: String },
//       hindi: { type: String },
//       urdu: { type: String },
//     },
//     summary: {
//       english: { type: String },
//       hindi: { type: String },
//       urdu: { type: String },
//     },
//     qnas: {
//       shortQuestions: [
//         {
//           question: { type: String, required: true },
//           answer: { type: String, required: true },
//         },
//       ],
//       mcqs: [
//         {
//           question: { type: String, required: true },
//           options: [{ type: String, required: true }],
//           correctAnswer: { type: String, required: true },
//         },
//       ],
//     },
//   },
//   { timestamps: true }
// );

// // Helper Method to fetch video details
// videoSchema.methods.fetchVideoDetails = async function () {
//   // Use ytdl-core to fetch video details directly from the URL
//   const videoData = await getYouTubeVideoDetails(this.videoUrl);

//   this.thumbnailUrl = videoData.thumbnailUrl;
//   this.title = videoData.title;
//   this.duration = videoData.duration;
//   this.videoDetails = videoData.videoDetails;  // Save the complete video details

//   return this.save();
// };

// // Helper function to get YouTube video details using ytdl-core
// const getYouTubeVideoDetails = async (url) => {
//   try {
//     // Fetch the video info using ytdl-core directly from the full YouTube URL
//     const info = await ytdl.getInfo(url);
    
//     // Extract video details from the info
//     const thumbnailUrl = info.videoDetails.thumbnails[0].url; // Get the highest quality thumbnail
//     const title = info.videoDetails.title; // Video title
//     const durationInSeconds = info.videoDetails.lengthSeconds; // Video duration in seconds

//     // Convert duration from seconds to minutes:seconds format
//     const minutes = Math.floor(durationInSeconds / 60);
//     const seconds = durationInSeconds % 60;
//     const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format as minutes:seconds

//     return {
//       thumbnailUrl,
//       title,
//       duration, // Duration in minutes:seconds format
//       videoDetails: info.videoDetails, // Save complete videoDetails object
//     };
//   } catch (error) {
//     throw new Error('Error fetching video details: ' + error.message);
//   }
// };

// export const Video = mongoose.model("Video", videoSchema);

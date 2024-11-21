import dotenv from "dotenv"; // For loading environment variables
import connectDB from "./db/index.js"; // Your database connection
import { app } from './app.js'; // Import the Express app
import ngrok from "ngrok"; // Import ngrok

dotenv.config({
    path: './.env'
});

// Function to start the server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log("⚙️ MongoDB connected successfully!");

        // Start the server
        const port = process.env.PORT || 8000;
        const server = app.listen(port, () => {
            console.log(`⚙️ Server is running on port: ${port}`);
        });

        // Start ngrok
        const ngrokUrl = await ngrok.connect({
            authtoken: process.env.NGROK_AUTH, // Use the token from .env
            addr: port, // The port your app is running on
        });
        console.log(`🌐 Public URL via ngrok: ${ngrokUrl}`);

    } catch (error) {
        console.error("❌ Error starting the server:", error.message);
        process.exit(1); // Exit the process on error
    }
};

// Start the server
startServer();

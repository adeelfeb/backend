// import express from 'express';  // Import express
// import dotenv from 'dotenv';  // Import dotenv to load environment variables
// import connectDB from './db/index.js';  // Import your DB connection

// dotenv.config();  // Load environment variables from default .env file

// const app = express();  // Initialize the express app

// // Create an async function to start the server after DB connection
// const startServer = async () => {
//   try {
//     // Connect to MongoDB
//     await connectDB();  // Wait for the DB connection to succeed
//     console.log("Database connected successfully!");

//     // Define a simple route
//     app.get('/', (req, res) => {
//       res.send('Hello, world!');
//     });

//     // Start the server once DB is connected
//     app.listen(process.env.PORT || 8000, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });

//   } catch (err) {
//     console.error("Error connecting to the database", err);
//     process.exit(1);  // Exit the process if DB connection fails
//   }
// };

// // Call the startServer function
// startServer();

// require('dotenv').config({path: './env'})


import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

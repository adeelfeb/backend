// import express from 'express';  // Import express
// import dotenv from 'dotenv';  // Import dotenv to load environment variables
// import connectDB from './db/index.js';  // Import your DB connection

// dotenv.config({ path: './env' });  // Load environment variables

// const app = express();  // Initialize the express app

// // Create an async function to start the server after DB connection
// const startServer = async () => {
//   // Connect to MongoDB
//   await connectDB(); // Wait for the DB connection to succeed

//   // Define a simple route
//   app.get('/', (req, res) => {
//     res.send('Hello, world!');
//   });

//   // Start the server once DB is connected
//   app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
//   });
// };

// // Call the startServer function
// startServer();




////-----------------------__________________________________________________------------------------------////////////////














// require('dotenv').config()
// console.log(process.env)
// import connectDB from "./db/index.js";


// console.log(process.env.PORT);  // Should print 8000
// console.log(process.env.MONGODB_URI);  // Should print your MongoDB URI (check for any encoding issues)


// connectDB()








// console.log(process.platform, DB_NAME); // Outputs 'win32', 'linux', or 'darwin'















////-----------------------__________________________________________________------------------------------////////////////


import {DB_NAME} from './constants.js'
import mongoose from 'mongoose';
import express from 'express'
const app = express()

//expample of an IIFE code statement
//the semicolon is just for precausion and IIFE is  a function that is invoked immediately after it is written
;(async ()=>{
    try {
        console.log("Before sending connection to database",`${process.env.MONGODB_URI}/${DB_NAME}` )
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("After the connection was send :::")
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        app.on("error", (error)=>{
            console.log('Error with connection to database from App.express() ');
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on PORT:${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Connection error with database", error)
        throw error
    }
})()
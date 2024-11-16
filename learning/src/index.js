// src/index.js
import dotenv from 'dotenv';  // Import dotenv
import connectDB from './db/index.js';  // Import your DB connection

dotenv.config({ path: './env' });  // Load environment variables

// Call connectDB and ensure the app stays alive
const startApp = async () => {
  await connectDB();  // Call the DB connection
  console.log('Application started...');  // Confirm the app started
};

startApp();




////-----------------------__________________________________________________------------------------------////////////////














// require('dotenv').config()
// console.log(process.env)
// import connectDB from "./db/index.js";


// console.log(process.env.PORT);  // Should print 8000
// console.log(process.env.MONGODB_URI);  // Should print your MongoDB URI (check for any encoding issues)


// connectDB()








// console.log(process.platform, DB_NAME); // Outputs 'win32', 'linux', or 'darwin'















////-----------------------__________________________________________________------------------------------////////////////




// import express from 'express'
// const app = express()

// //expample of an IIFE code statement
// //the semicolon is just for precausion and IIFE is  a function that is invoked immediately after it is written
// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error)=>{
//             console.log('Error with connection to database from App.express() ');
//             throw error
//         })
//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on PORT:${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.log("Connection error with database", error)
//         throw error
//     }
// })()
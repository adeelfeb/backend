// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js"; // Assuming you have a constants.js file

// const connectDB = async () => {
//   try {
//     console.log("Here now in connectDB function try");

//     // Add timeout to ensure quicker failure in case of network issue
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`, 
//       { serverSelectionTimeoutMS: 5000 } // Set timeout to 5 seconds
//     );

//     // Logging the connection instance
//     console.log("Connection Instance:", connectionInstance);
//     console.log(`MongoDB Connected @ DB Host: "${connectionInstance.connection.host}"`);
//   } catch (error) {
//     console.log("Connection error with database", error);
//     process.exit(1); // Exit the process on error
//   }
// };

// export default connectDB;



import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        console.log("Before sending connection to database",`${process.env.MONGODB_URI}/${DB_NAME}` )
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("After the connection was send :::")
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB
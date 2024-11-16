// db/index.js
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; // Assuming you have a constants.js file

const connectDB = async () => {
  try {
    // Connecting to MongoDB
    console.log("Here now in connnectDB function try")
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    // Logging the connection instance
    console.log("Connection Instance:", connectionInstance);
    console.log(`MongoDB Connected @ DB Host: "${connectionInstance.connection.host}"`);
  } catch (error) {
    console.log("Connection error with database", error);
    process.exit(1); // Exit the process on error
  }
};

export default connectDB;

import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from 'express'
const app = express()

//expample of an IIFE code statement
//the semicolon is just for precausion and IIFE is  a function that is invoked immediately after it is written
;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
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
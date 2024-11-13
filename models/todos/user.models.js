import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
    }

}, {timeStamps: true})


export const User = mongoose.model('User', userSchema)

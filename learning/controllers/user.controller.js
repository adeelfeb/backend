import { asyncHandler } from "../utils/asyncHandler.js"


const registerUser = asyncHandler( async (req, res)=>{
    res.status(200).json({
        message: "From the user.contoller.js a message is send inside the status field"
    })
})

export {registerUser}
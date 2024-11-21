import {Router} from "express"
import { addVideo } from "../controllers/addvideo.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/addVideo").post(verifyJWT, addVideo)

export default router
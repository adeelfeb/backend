import { Router } from "express";
import { addTranscript, addVideo, addSummary, addQnas } from "../controllers/addvideo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addVideo").post(verifyJWT, addVideo); // Add video endpoint
router.route("/addTranscript").post(addTranscript); // Add transcript endpoint
router.route("/addSummary").post(addSummary);// Add Summary Route
router.route("/addQnas").post(addQnas);


export default router;

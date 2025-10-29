import express from "express";
import { createInterview, getInterviewById } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/createinterview", createInterview);
router.post("/getinterview", getInterviewById)

export default router;
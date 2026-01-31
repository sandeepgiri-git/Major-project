import express from "express";
import { checkAnswer, createInterview, deleteInterview, endInterview, generateSummary, getAllinterviews, getInterviewById, getSummaryById, startInterview } from "../controllers/interviewController.js";
import { userAuth } from "../middleware/userAuth.js";
import { interviewAuth, sessionAuth, updateSession } from "../middleware/interviewAuth.js";

const router = express.Router();

router.post("/createinterview", userAuth, createInterview);
router.get("/getinterview/:id", userAuth, getInterviewById);
router.get("/getallinterviews", userAuth, getAllinterviews);
router.delete("/deleteinterview/:id", userAuth, interviewAuth, deleteInterview);
router.get("/startinterview/:id", userAuth, interviewAuth, startInterview);
router.get("/submitinterview/:id", userAuth, interviewAuth, endInterview);
router.post("/checkanswer/:id", userAuth, interviewAuth, updateSession, sessionAuth, checkAnswer);
router.get("/generatesummary/:id", userAuth, interviewAuth, generateSummary);
router.get("/getsummary/:id", userAuth, interviewAuth, getSummaryById);

export default router;
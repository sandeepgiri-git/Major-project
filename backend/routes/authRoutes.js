import express from "express";
import { checkOtp, login, myInfo, onBoarding, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", myInfo);
router.post("/checkotp", checkOtp);
router.post("/onboarding", onBoarding);


export default router;
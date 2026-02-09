import express from "express";
import { checkOtp, forgetPassword, login, myInfo, onBoarding, resetPassword, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", myInfo);
router.post("/checkotp", checkOtp);
router.post("/onboarding", onBoarding);
router.post("/reset-password", resetPassword);
router.post("/forget-password", forgetPassword);


export default router;
import { sendOtp, verifyOtp } from '../controller/otp.controller.js' // Corrected import
import express from "express";

const router = express.Router();
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

export default router;

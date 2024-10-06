import express from "express";
import { postAns, verifyAnswer } from "../controller/securityquestion.controller.js";
const router = express.Router();

router.post("/answerverify", verifyAnswer);
router.post("/answersend", postAns);


export default router;
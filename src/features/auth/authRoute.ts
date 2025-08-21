import express from "express";
import { generateAPIKey, getAPIKey, loginAndSignupUser } from "./authController";
import { verifyUser } from "../../middlewares/verifyUser";


const router = express.Router();

router.post("/login",loginAndSignupUser)
router.get('/get-api-key',verifyUser,getAPIKey)
router.post("/generate-api-key",verifyUser, generateAPIKey)

export default router
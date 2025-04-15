import express from "express";
import { loginAndSignupUser } from "./authController";
import { verifyUser } from "../../middlewares/verifyUser";


const router = express.Router();



router.post("/login",loginAndSignupUser)
router.get("/signup",verifyUser,(req,res)=>{
    res.json("signup")
})

export default router
import { NextFunction, Response } from "express"
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import AppError from "../utils/appError";
import { RequestWithUser } from "../types/customRequest";


export const verifyUser = expressAsyncHandler((req:RequestWithUser,res:Response,next:NextFunction)=>{
        const authHeader = req.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError("Authorization header missing or malformed",401)
        }
    
        const token = authHeader.split(' ')[1]; // Get token after "Bearer"
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(decoded)
        req.userId = "decoded"; // Attach decoded payload to req.user
        next();
})


import { NextFunction, Response } from "express"
import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../utils/appError";
import { RequestWithUser } from "../types/customRequest";


export const verifyUser = expressAsyncHandler((req:RequestWithUser,res:Response,next:NextFunction)=>{
        const authHeader = req.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError("Authorization header missing or malformed",401)
        }
    
        const token = authHeader.split(' ')[1]; // Get token after "Bearer"
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
            const userId = (decoded as JwtPayload & { userId: string }).userId;
            req.userId = userId; // Attach decoded payload to req.userId
            return next();
        }

        throw new AppError("Invalid token",401)
})


import { NextFunction, Response } from "express"
import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../utils/appError";
import { RequestWithUser } from "../types/customRequest";
import prisma from "../lib/db";


export const verifyUser = expressAsyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const apiKeyHeader = req.headers["x-api-key"];

    // Case 1: Bearer Token (standard JWT auth)
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
            req.userId = (decoded as JwtPayload & { userId: string }).userId;
            return next();
        }

        throw new AppError("Invalid token", 401);
    }

    // Case 2: API Key Auth
    if (apiKeyHeader && typeof apiKeyHeader === "string") {

        if(req.method !== "GET"){
            throw new AppError("API key authentication is only allowed for GET requests", 401);
        }
        // validate API key using DB
        const apikey = await prisma.aPIKey.findFirst({ where: { key: apiKeyHeader } });
        if (!apikey) {
            throw new AppError("Invalid API key", 401);
        }
        // At this point, the API key is valid  now
        req.userId = apikey.userId;
        req.apiKey = true;
        return next();
    }


    throw new AppError("Invalid token", 401)
})


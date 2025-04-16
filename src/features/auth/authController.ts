import { Request, Response } from "express"
import sendResponse from "../../utils/sendResponse"
import expressAsyncHandler from "express-async-handler"
import AppError from "../../utils/appError"
import prisma from "../../lib/db"
import jwt from "jsonwebtoken"

export const loginAndSignupUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, email, profile_url } = req.body
    if (!name || !email) {
        throw new AppError("name and email are required", 400)
    }

    let message = "User logged in successfully";

    let userData = await prisma.user.findFirst({ where: { email } })
    if (!userData) {
        userData = await prisma.user.create({
            data: {
                name,
                email,
                profile_url
            }
        })
        message = "User created successfully"
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    // Payload to store in the token
    const payload = {
        userId: userData.id,
        email: userData.email,
        role: userData.role,
    };

    // Create the token (expires in 1 hour)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
    sendResponse({ res, message, data: token })
})

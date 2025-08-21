import { Request, Response } from "express"
import sendResponse from "../../utils/sendResponse"
import expressAsyncHandler from "express-async-handler"
import AppError from "../../utils/appError"
import prisma from "../../lib/db"
import jwt from "jsonwebtoken"
import { RequestWithUser } from "../../types/customRequest"
import crypto from "crypto"
import { OAuth2Client } from "google-auth-library"
import { Prisma } from "@prisma/client"


// Login and Signup user with Google
// This function is used to login and signup user with Google
// It takes a token as a parameter and verifies it with Google
// If the user is not found, it creates a new user
// If the user is found, it logs in the user
// It returns a JWT token
// @route POST /api/auth/login (public)
export const loginAndSignupUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body
    if (!token) {
        throw new AppError("token is required", 400)
    }

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
        idToken: token
      });
  
      const googlePayload = ticket.getPayload();
      
      if (!googlePayload) {
        throw new AppError('Invalid token payload', 400);
      }

  
    let message = "User logged in successfully";

    let userData = await prisma.user.findFirst({ where: { email: googlePayload.email } })
    if (!userData) {
        if(!googlePayload.name || !googlePayload.email || !googlePayload.picture || !googlePayload.email_verified){
            throw new AppError("name, email, picture and email_verified are required", 400)
        }
        userData = await prisma.user.create({
            data: {
                name:googlePayload.name ,
                email:googlePayload.email ,
                profile_url:googlePayload.picture 
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
    const jwt_token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
    sendResponse({ res, message, data: jwt_token })
})

// Get API key used to access the API
// This function is used to get the API key of the user
// It takes a user ID as a parameter and returns the API key
// It returns the API key
// @route GET /api/auth/get-api-key (private)
export const getAPIKey = expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.userId;
    if(!userId){
        throw new AppError("User not found", 404)
    }
    const apiKey = await prisma.aPIKey.findFirst({ where: { userId } });
    sendResponse({ res, message: "API key fetched successfully", data: apiKey })
})

// Generate API key used to access the API
// This function is used to generate the API key of the user
// It takes a user ID as a parameter and generates the API key
// It returns the API key
// @route POST /api/auth/generate-api-key (private)
export const generateAPIKey = expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.userId;
    if(!userId){
        throw new AppError("User not found", 404)
    }
    const hash = crypto
          .createHmac("sha256", process.env.JWT_SECRET as string)
          .update(userId + Date.now()) // combine user ID + timestamp
          .digest("hex");

    
    try{
        const apiKey = await prisma.aPIKey.create({ data: { key: hash, isActive: true, userId } });
        sendResponse({ res, message: "API key generated successfully", data: apiKey })
    }
    catch(e){
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === "P2002"){
                throw new AppError("API key already exists", 400)
            }
        }
        throw new AppError("API key generation failed", 500)
    }
})
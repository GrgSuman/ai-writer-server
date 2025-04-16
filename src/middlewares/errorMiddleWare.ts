import { NextFunction, Request, Response } from "express"

// Custom Error Interface
interface CustomError extends Error {
    statusCode?: number;
  }

export const errorHandler = (err:CustomError,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success:false,
        message:err.message,
        stack: process.env.NODE_ENV === 'production' ? 'null' : err.stack
    })
}

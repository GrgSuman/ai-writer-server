// utils/sendResponse.js
import { Response } from "express";

const sendResponse = ({res, statusCode = 200, message="success", data }: { res: Response, statusCode?: number, message?: string, data: any }) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

export default sendResponse;
  
import { Request } from "express";
import { Project } from "@prisma/client";

export interface CustomRequest extends Request {
    project?: Project;
}


export interface RequestWithUser extends Request {
    userId?: string;
}
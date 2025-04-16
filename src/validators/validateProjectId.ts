import { Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import projectService from "../features/projects/projectService";
import AppError from "../utils/appError";
import { RequestWithUser } from "../types/customRequest";


const validateProject = expressAsyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { projectId } = req.params;
    const userId = req.userId;
    const project = await projectService.getSingleProjectByIdandUser(projectId,userId as string);
    if (!project) {
        throw new AppError("Project not found", 404);
    }
    next();
});

export default validateProject;
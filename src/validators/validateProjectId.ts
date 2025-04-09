import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import projectService from "../features/projects/projectService";
import AppError from "../utils/appError";


const validateProject = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;
    const project = await projectService.getSingleProjectById(projectId);
    if (!project) {
        throw new AppError("Project not found", 404);
    }
    next();
});

export default validateProject;
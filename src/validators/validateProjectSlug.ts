import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import projectService from "../features/projects/projectService";
import { CustomRequest } from "../types/customRequest";


const validateProject = expressAsyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { projectSlug } = req.params;
    const project = await projectService.getSingleProjectBySlug(projectSlug);
    if (!project) {
        res.status(404).json({
            "success": false,
            "message": "Project not found"
        });
        return;
    }
    // Attach project to request object for use in route handlers
    req.project = project;
    next();
});

export default validateProject;
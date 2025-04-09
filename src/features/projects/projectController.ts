import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import projectService from "./projectService";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/appError";
/**
 * @route GET /api/projects
 * @desc Get all projects
 * @access Public
 */
export const getAllProjects =  expressAsyncHandler(async (req: Request, res: Response) => {
    const projects = await projectService.getProjects();
    sendResponse({res, data: projects})
})

/**
 * @route GET /api/projects/:projectId
 * @desc Get a single project by projectId
 * @access Public
 */
export const getSingleProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await projectService.getSingleProjectById(projectId);
    sendResponse({res, data: project})
})

/**
 * @route POST /api/projects
 * @desc Add a new project
 * @access Public
 */
export const addNewProject = expressAsyncHandler(async (req: Request, res: Response) => {
    // Soft background color combinations for cards
    const softColorPalettes = [
        { start: "#f0e6fa", end: "#d8c8f0" }, // Soft Lavender
        { start: "#e0f5ff", end: "#c2e5fb" }, // Pale Sky
        { start: "#fff2cc", end: "#ffe699" }, // Buttercream
        { start: "#d9f2e6", end: "#b3e6cc" }, // Mint Cream
        { start: "#ffe0e0", end: "#ffb3b3" }, // Blush Pink
        { start: "#e6f9ff", end: "#ccf2ff" }, // Ice Blue
        { start: "#fff0e6", end: "#ffd9bf" }, // Peach Cream
        { start: "#f2e6ff", end: "#e0ccff" }, // Lilac Mist
        { start: "#e6fffa", end: "#b3fff0" }, // Seafoam
        { start: "#f9f2ff", end: "#ecd9ff" }  // Orchid Haze
    ];
    const { name } = req.body;
    if (!name) {
        throw new AppError("Project Name is required", 400);
    }

    const gradientStart = softColorPalettes[Math.floor(Math.random() * softColorPalettes.length)].start;    
    const gradientEnd = softColorPalettes[Math.floor(Math.random() * softColorPalettes.length)].end;

    const project = await projectService.addNewProject(name, gradientStart, gradientEnd);
    sendResponse({res, data: project})
})

/**
 * @route PUT /api/projects/:id
 * @desc Update a project
 * @access Public
 */
export const updateProject = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const{ name, description, systemPrompt} = req.body;

    if(!name || !description || !systemPrompt){
        throw new AppError("all fields are required to update project", 400);
    }
    const updatedProject = await projectService.updateProject(projectId, name, description, systemPrompt);
    sendResponse({res, message: "Project updated successfully", data: updatedProject})
})

/**
 * @route DELETE /api/projects/:id
 * @desc Delete a project
 * @access Public
 */
export const deleteProject = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const  deletedProject =  await projectService.deleteProject(projectId);
    sendResponse({res, message: "Project deleted successfully", data: deletedProject})
})


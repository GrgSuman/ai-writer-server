import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import projectService from "./projectService";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/appError";
import prisma from "../../lib/db";
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
    const softColorPalettes = [
        { start: "#fdfbfb", end: "#ebedee" }, // Light Gray Mist
        { start: "#f6f8ff", end: "#dbe4ff" }, // Baby Blue
        { start: "#ffe9ec", end: "#ffd3e2" }, // Blush Pink
        { start: "#e0fff9", end: "#ccf5ef" }, // Minty Breeze
        { start: "#fff8e1", end: "#ffecb3" }, // Soft Peach
        { start: "#e9f7ef", end: "#d0f0d6" }, // Pale Green
        { start: "#fef9e7", end: "#fff3cd" }, // Light Cream
        { start: "#f3e5f5", end: "#e1bee7" }, // Lavender Haze
        { start: "#f0f4c3", end: "#e6ee9c" }, // Light Lemon
        { start: "#e0f7fa", end: "#b2ebf2" }  // Powder Blue
    ];
    const { name } = req.body;
    if (!name) {
        throw new AppError("Project Name is required", 400);
    }

    const projectExists = await prisma.project.findFirst({ where: { name } });
    if (projectExists) {
        throw new AppError("Project with this name already exists", 400);
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

    const projectExists = await prisma.project.findFirst({ where: { name } });
    if (projectExists) {
        throw new AppError("Project with this name already exists", 400);
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


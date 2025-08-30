import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import projectService from "./projectService";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/appError";
import { RequestWithUser } from "../../types/customRequest";
import { getEmojiBasedOnText } from "../ai/ai.service";
/**
 * @route GET /api/projects
 * @desc Get all projects of a user
 * @access Private
 */
export const getAllProjects =  expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    const projects = await projectService.getProjectsByUserId(req.userId as string);
    sendResponse({res, data: projects})
})

/**
 * @route GET /api/projects/:projectId
 * @desc Get a single project by projectId
 * @access Private
 */
export const getSingleProject =  expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    const { projectId } = req.params;
    const project = await projectService.getSingleProjectByIdandUser(projectId, req.userId as string);
    sendResponse({res, data: project})
})

/**
 * @route POST /api/projects
 * @desc Add a new project
 * @access Private
 */
export const addNewProject = expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.userId as string;

    // const softColorPalettes = [
    //     { start: "#2C3E50 ", end: "#4CA1AF" }, // Light Gray Mist
    //     { start: "#614385 ", end: "#516395" }, // Baby Blue
    //     { start: "#16222A ", end: "#3A6073" }, // Blush Pink
    //     { start: "#41295A ", end: "#2F0743" }, // Minty Breeze
    //     { start: "#1E3C72 ", end: "#2A5298" }, // Soft Peach
    //     { start: "#11998e ", end: "#38ef7d" }, // Pale Green
    //     { start: "#000428 ", end: "#004e92" }, // Light Cream
    //     { start: "#0F2027 ", end: "#2C5364" }, // Lavender Haze
    //     { start: "#1A2980 ", end: "#26D0CE" }, // Light Lemon
    // ];
    const softColorPalettes = [
            {"start": "#0F2027 ","end": "#2C5364"},
            {"start": "#6A3093 ","end": "#A044FF"},
            {"start": "#FF8008 ","end": "#FFC837 "},
            {"start": "#EB3349 ","end": "#F45C43"},
            {"start": "#614385 ","end": "#516395"},
            {"start": "#396AF2 ","end": "#2948FF"},
            {"start": "#2C3E50  ","end": "#1A242E"},
            {"start": "#0F4C5C  ","end": "#083A49"},
      ]
    const { name } = req.body;
    if (!name) {
        throw new AppError("Project Name is required", 400);
    }

    const gradientStart = softColorPalettes[Math.floor(Math.random() * softColorPalettes.length)].start;    
    const gradientEnd = softColorPalettes[Math.floor(Math.random() * softColorPalettes.length)].end;

    const emoji = await getEmojiBasedOnText(name);

    const project = await projectService.addNewProject(name, gradientStart, gradientEnd, userId, emoji);
    sendResponse({res, data: project})
})

/**
 * @route PUT /api/projects/:id
 * @desc Update a project
 * @access Private
 */
export const updateProject = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const{ name, description} = req.body;

    if(!name || !description ){
        throw new AppError("all fields are required to update project", 400);
    }

    const updatedProject = await projectService.updateProject(projectId, name, description);
    sendResponse({res, message: "Project updated successfully", data: updatedProject})
})

/**
 * @route DELETE /api/projects/:id
 * @desc Delete a project
 * @access Private
 */
export const deleteProject = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const  deletedProject =  await projectService.deleteProject(projectId);
    sendResponse({res, message: "Project deleted successfully", data: deletedProject})
})
    
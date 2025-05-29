import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import projectService from "./projectService";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/appError";
import { RequestWithUser } from "../../types/customRequest";
/**
 * @route GET /api/projects
 * @desc Get all projects
 * @access Public
 */
export const getAllProjects =  expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    // const projects = await projectService.getProjects();
    const projects = await projectService.getProjectsByUserId(req.userId as string);
    sendResponse({res, data: projects})
})

/**
 * @route GET /api/projects/:projectId
 * @desc Get a single project by projectId
 * @access Public
 */
export const getSingleProject =  expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    const { projectId } = req.params;
    // const project = await projectService.getSingleProjectById(projectId);
    const project = await projectService.getSingleProjectByIdandUser(projectId, req.userId as string);
    sendResponse({res, data: project})
})

/**
 * @route POST /api/projects
 * @desc Add a new project
 * @access Public
 */
export const addNewProject = expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.userId as string;

    const softColorPalettes = [
        { start: "#2C3E50 ", end: "#4CA1AF" }, // Light Gray Mist
        { start: "#614385 ", end: "#516395" }, // Baby Blue
        { start: "#16222A ", end: "#3A6073" }, // Blush Pink
        { start: "#41295A ", end: "#2F0743" }, // Minty Breeze
        { start: "#1E3C72 ", end: "#2A5298" }, // Soft Peach
        { start: "#11998e ", end: "#38ef7d" }, // Pale Green
        { start: "#000428 ", end: "#004e92" }, // Light Cream
        { start: "#0F2027 ", end: "#2C5364" }, // Lavender Haze
        { start: "#1A2980 ", end: "#26D0CE" }, // Light Lemon
    ];
    const { name } = req.body;
    if (!name) {
        throw new AppError("Project Name is required", 400);
    }

    // const projectExists = await prisma.project.findFirst({ where: { name } });
    // if (projectExists) {
    //     throw new AppError("Project with this name already exists", 400);
    // }

    const gradientStart = softColorPalettes[Math.floor(Math.random() * softColorPalettes.length)].start;    
    const gradientEnd = softColorPalettes[Math.floor(Math.random() * softColorPalettes.length)].end;

    const project = await projectService.addNewProject(name, gradientStart, gradientEnd, userId);
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

    // const projectExists = await prisma.project.findFirst({ where: { name } });
    // if (projectExists) {
    //     throw new AppError("Project with this name already exists", 400);
    // }

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

/**
 * @route GET /api/projects/:projectId/research-content-ideas
 * @desc Get research content ideas for a project
 * @access Private
 */
export const getResearchContentIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const researchContentIdeas = await projectService.getResearchContentIdeas(projectId);
    sendResponse({res, data: researchContentIdeas})
})


/**
 * @route POST /api/projects/:projectId/research-content-ideas
 * @desc Add research content ideas for a project
 * @access Private
 */

export const addResearchContentIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { title, keywords, description, wordCount, postFormat, whyGoodIdea } = req.body;
    if(!title || !keywords || !description || !wordCount || !postFormat || !whyGoodIdea){
        throw new AppError("All fields are required to add research content ideas", 400);
    }
    if(typeof wordCount !== "number"){
        throw new AppError("Word count must be a number", 400);
    }
    const researchContentIdeas = await projectService.addResearchContentIdeas(projectId, title, keywords, description, wordCount, postFormat, whyGoodIdea);
    sendResponse({res, message: "Research content ideas added successfully", data: researchContentIdeas})
})

export const deleteResearchContentIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { researchContentIdeasId } = req.params;
    const deletedResearchContentIdeas = await projectService.deleteResearchContentIdeas(researchContentIdeasId);
    sendResponse({res, message: "Research content ideas deleted successfully", data: deletedResearchContentIdeas})
})


    
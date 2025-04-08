import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import projectService from "./projectService";

/**
 * @route GET /api/projects
 * @desc Get all projects
 * @access Public
 */
export const getAllProjects =  expressAsyncHandler(async (req: Request, res: Response) => {
    const projects = await projectService.getProjects();
    res.json({
        "success": true,
        "message": "success",
        "data": projects
    })
})

/**
 * @route GET /api/projects/:slug
 * @desc Get a single project by slug
 * @access Public
 */
export const getSingleProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const project = await projectService.getSingleProjectBySlug(slug);

    if (project===null) {
         res.status(404).json({
            "success": false,
            "message": "Project not found with the given slug"
        });
        return
    }
    res.json({
        "success": true,
        "message": "success",
        "data": project
    })
})

/**
 * @route POST /api/projects
 * @desc Add a new project
 * @access Public
 */
export const addNewProject = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            "success": false,
            "message": "name is required"
        });
        return
    }

    const project = await projectService.addNewProject(name);
    res.json({
        "success": true,
        "message": "success",
        "data": project
    })
})

/**
 * @route PUT /api/projects/:id
 * @desc Update a project
 * @access Public
 */
export const updateProject = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const{ name, description, systemPrompt} = req.body;

    const project = await projectService.getSingleProjectById(id);
    if(!project){
        res.status(400).json({
            "success": false,
            "message": "project not found"
        });
        return
    }

    if(!name || !description || !systemPrompt){
        res.status(400).json({
            "success": false,
            "message": "all fields are required to update project"
        });
        return
    }

    const updatedProject = await projectService.updateProject(id,name,description,systemPrompt);

    res.json({
        "success": true,
        "message": "success",
        "data": updatedProject
    })
})

/**
 * @route DELETE /api/projects/:id
 * @desc Delete a project
 * @access Public
 */
export const deleteProject = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await projectService.getSingleProjectById(id);

    if (!project) {
        res.status(400).json({
            "success": false,
            "message": "project not found"
        });
        return
    }
    const  deletedProject =  await projectService.deleteProject(id);
    res.json({
        "success": true,
        "message": "success",
        "data": deletedProject
    })
})


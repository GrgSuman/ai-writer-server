import { NextFunction, Request, Response } from "express";
import prisma from "../../lib/db";

export const getAllProjects = async (req: Request, res: Response) => {
    const projects = await prisma.project.findMany({
        where: { isActive: true }
    });
    res.json({
        "success": true,
        "message": "success",
        "data": projects
    })
}

export const getSingleProject = async (req: Request, res: Response,next:NextFunction) => {
    const { id } = req.params;
    try{
        const projects = await prisma.project.findUnique({ where: { id, isActive: true } });
        if (!projects) {
            throw new Error('ID not found');
        }
        res.json({
            "success": true,
            "message": "success",
            "data": projects
        })
    }catch (error) {
        next(error)
    }
}

export const addNewProject = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            "success": false,
            "message": "name is required"
        });
        return
    }

    const project = await prisma.project.create({ data: { name } });
    res.json({
        "success": true,
        "message": "success",
        "data": project
    })
}

export const updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const{ name, description, systemPrompt} = req.body;
    if(!name){
        res.status(400).json({
            "success": false,
            "message": "all fields are required to update project"
        });
        return
    }

    const project = await prisma.project.findUnique({ where: { id } });
    if(!project){   
        res.status(400).json({    
            "success": false,
            "message": "project not found"
        });
        return
    }

    const updatedProject = await prisma.project.update({
         where: { id },
         data: { name, description, systemPrompt }
    });

    res.json({
        "success": true,
        "message": "success",
        "data": updatedProject
    })
}

export const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
        res.status(400).json({
            "success": false,
            "message": "project not found"
        });
        return
    }
    await prisma.project.update({ where: { id }, data: { isActive: false } }); 
    res.json({
        "success": true,
        "message": "success",
        "data": "new project deleted"
    })
}


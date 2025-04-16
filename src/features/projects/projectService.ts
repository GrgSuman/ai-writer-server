import { Prisma } from "@prisma/client";
import prisma from "../../lib/db";
import AppError from "../../utils/appError";
import { get } from "http";

const getProjects = async () => {
    const projects = await prisma.project.findMany({
        where: {
            isActive: true
        },
        include: {
            categorys: true,
            _count: {
                select: { posts: true }
              }
        }
    });

    if (!projects) {
        throw new AppError("No projects found", 404);
    }

    
    return projects
}

const getProjectsByUserId = async (userId: string) => {
    const projects = await prisma.project.findMany({
        where: {
            isActive: true,
            userId
        },
        include: {
            categorys: true,
            _count: {
                select: { posts: true }
              }
        }
    });

    if (!projects) {
        throw new AppError("No projects found", 404);
    }

    
    return projects
}


const getSingleProjectById = async (id: string) => {
    const projects = await prisma.project.findUnique({
         where:{ isActive: true, id },
         include: {
            categorys: true,
            _count: {
                select: { posts: true }
              }
         }
         
        });
    if (!projects) {
        throw new AppError("No projects found", 404);
    }
    return projects;
}

const getSingleProjectByIdandUser = async (projectId: string,userId: string) => {
    const projects = await prisma.project.findUnique({
         where:{ isActive: true, id:projectId, userId },
         include: {
            categorys: true,
            _count: {
                select: { posts: true }
              }
         }
         
        });
    if (!projects) {
        throw new AppError("No projects found", 404);
    }
    return projects;
}

const addNewProject = async (name: string, gradientStart: string, gradientEnd: string, userId: string) => {
    try {
        const project = await prisma.project.create({ data: { name, gradientStart, gradientEnd, userId } });
        if (!project) {
            throw new AppError("Error adding project", 404);
        }
        return project
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new AppError("Project with this name already exists", 400);
            }
        }
        throw new AppError("Error adding project", 404);
    }
}

const updateProject = async (id: string, name: string, description: string, systemPrompt: string) => {
    try {
        const project = await prisma.project.update({
            where: { id },
            data: {
                name,
                description,
                systemPrompt
            }
        });

        return project
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new AppError("Project with this name already exists", 400);
            }
        }
        console.log(error)
        throw new AppError("Error updating project", 404);
    }

}

const deleteProject = async (id: string) => {
    const project = await prisma.project.delete({ where: { id } });
    if (!project) {
        throw new AppError("Error deleting project", 404);
    }
    return project
}

const projectService = {
    getProjects,
    getSingleProjectById,
    getProjectsByUserId,
    getSingleProjectByIdandUser,
    addNewProject,
    updateProject,
    deleteProject
}

export default projectService
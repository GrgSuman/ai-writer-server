import { Prisma } from "@prisma/client";
import prisma from "../../lib/db";
import AppError from "../../utils/appError";

// Get all projects of a user
// This function is used to get all projects of a user
// It takes a user ID as a parameter and returns all projects of the user
// It returns all projects of the user
// @route GET /api/projects
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
            },
        }
    });

    if (!projects) {
        throw new AppError("No projects found", 404);
    }

    return projects
}

// Get a single project by projectId and userId
// This function is used to get a single project by projectId and userId
// It takes a projectId and userId as parameters and returns a single project
// It returns a single project
// @route GET /api/projects/:projectId
const getSingleProjectByIdandUser = async (projectId: string, userId: string) => {
    const projects = await prisma.project.findUnique({
        where: { isActive: true, id: projectId, userId },
        include: {
            categorys: true,
            _count: {
                select: { posts: true, researchContentIdeas: true }
            }
        }

    });
    if (!projects) {
        throw new AppError("No projects found", 404);
    }
    return projects;
}

// Add a new project
// This function is used to add a new project
// It takes a name, gradientStart, gradientEnd and userId as parameters and adds a new project
// It returns the new project
// @route POST /api/projects
const addNewProject = async (name: string, gradientStart: string, gradientEnd: string, userId: string, emoji: string) => {
    try {
        const project = await prisma.project.create({ data: { name, gradientStart, gradientEnd, userId, emoji } });
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

// Update a project
// This function is used to update a project
// It takes a projectId, name, description and systemPrompt as parameters and updates the project
// It returns the updated project
// @route PUT /api/projects/:projectId
const updateProject = async (id: string, name: string, description: string) => {
    try {
        const project = await prisma.project.update({
            where: { id },
            data: {
                name,
                description
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

// Delete a project
// This function is used to delete a project
// It takes a projectId as a parameter and deletes the project
// It returns the deleted project
// @route DELETE /api/projects/:projectId
const deleteProject = async (id: string) => {
    const project = await prisma.project.delete({ where: { id } });
    if (!project) {
        throw new AppError("Error deleting project", 404);
    }
    return project
}

const projectService = {
    getProjectsByUserId,
    getSingleProjectByIdandUser,
    addNewProject,
    updateProject,
    deleteProject
}

export default projectService
import { Prisma } from "@prisma/client";
import prisma from "../../lib/db";
import AppError from "../../utils/appError";

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
        where: { isActive: true, id },
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

const getSingleProjectByIdandUser = async (projectId: string, userId: string) => {
    const projects = await prisma.project.findUnique({
        where: { isActive: true, id: projectId, userId },
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


const getResearchContentIdeas = async (projectId: string) => {
    try {
        const researchContentIdeas = await prisma.researchContentIdeas.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return researchContentIdeas;
    } catch (error) {
        throw new AppError("Error fetching research content ideas", 500);
    }
}


const addResearchContentIdeas = async (projectId: string, title: string, keywords: string, description: string, wordCount: number, postFormat: string, whyGoodIdea: string[]) => {
    try {
        // Check for duplicate title
        const existingIdea = await prisma.researchContentIdeas.findFirst({
            where: {
                projectId,
                title
            }
        });

        if (existingIdea) {
            throw new AppError("Research content idea with this title already exists", 400);
        }

        const researchContentIdeas = await prisma.researchContentIdeas.create({
            data: {
                projectId,
                title,
                keywords,
                description,
                wordCount,
                postFormat,
                whyGoodIdea
            }
        });
        return researchContentIdeas;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Error creating research content ideas", 500);
    }
}


const deleteResearchContentIdeas = async (id: string) => {
    const researchContentIdeas = await prisma.researchContentIdeas.delete({ where: { id } });
    if (!researchContentIdeas) {
        throw new AppError("Error deleting research content ideas", 404);
    }
    return researchContentIdeas;
}

const projectService = {
    getProjects,
    getSingleProjectById,
    getProjectsByUserId,
    getSingleProjectByIdandUser,
    addNewProject,
    updateProject,
    deleteProject,
    getResearchContentIdeas,
    addResearchContentIdeas,
    deleteResearchContentIdeas
}

export default projectService
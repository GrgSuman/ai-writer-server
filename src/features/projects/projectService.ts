import prisma from "../../lib/db";
import { slugify } from "../../lib/slugify";

const getProjects = async () => {
    try {
        const projects = await prisma.project.findMany({ 
            where: {
                 isActive: true
                 },
            include: {
                categorys: true
            }
         });
        return projects
    } catch (error) {
        throw new Error("Error fetching projects");
    }
}

const getSingleProjectBySlug = async (slug: string) => {
    try {
        const projects = await prisma.project.findUnique({ where: { isActive: true, slug } });
        return projects
    } catch (error) {
        throw new Error("Error fetching projects");
    }
}

const getSingleProjectById = async (id: string) => {
    try {
        const projects = await prisma.project.findUnique({ where: { isActive: true, id } });
        return projects
    } catch (error) {
        throw new Error("Error fetching projects");
    }
}

const addNewProject = async (name: string) => {
    try {
        const project = await prisma.project.create({ data: { name, slug: slugify(name) } });
        return project
    } catch (error) {
        throw new Error("Error adding project");
    }
}

const updateProject = async (id: string, name: string,description: string,systemPrompt: string) => {
    try {
        const project = await prisma.project.update({ 
            where: { id },
            data: {
                name, 
                slug: slugify(name),
                description,
                systemPrompt 
            }
         });
        return project
    } catch (error) {
        throw new Error("Error updating project");
    }
}

const deleteProject = async (id: string) => {
    try {
        const project = await prisma.project.delete({ where: { id } });
        return project
    } catch (error) {
        throw new Error("Error deleting project");
    }
}

const projectService = {
    getProjects,
    getSingleProjectBySlug,
    getSingleProjectById,
    addNewProject,
    updateProject,
    deleteProject
}

export default projectService
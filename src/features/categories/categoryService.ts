import prisma from "../../lib/db";
import { slugify } from "../../lib/slugify";

const getAllCategoriesinProject = async (projectId: string) => {
    try {
        const categories = await prisma.category.findMany({ where: { projectId } });
        return categories;
    } catch (error) {
        throw new Error("Error fetching categories");
    }
}

const getSingleCategoryinProject = async (projectId: string, categoryId: string) => {
    try {
        const category = await prisma.category.findUnique({
            where: { projectId, id: categoryId },
            include: {
                posts: true
            }
        });
        return category;
    } catch (error) {
        throw new Error("Error fetching category");
    }
}

const addNewCategoryinProject = async (projectId: string, name: string) => {
    try {
        const category = await prisma.category.create({ data: { projectId, name, slug: slugify(name) } });
        return category;
    } catch (error) {
        throw new Error("Error adding category");
    }
}

const updateCategoryinProject = async (projectId: string, categoryId: string, name: string) => {
    try {
        const category = await prisma.category.update({ where: { projectId, id: categoryId }, data: { name, slug: slugify(name) } });
        return category;
    } catch (error) {
        throw new Error("Error updating category");
    }
}

const deleteCategoryinProject = async (projectId: string, categoryId: string) => {
    try {
        const category = await prisma.category.delete({ where: { projectId, id: categoryId } });
        return category;
    } catch (error) {
        throw new Error("Error deleting category");
    }
}

export default {
    getAllCategoriesinProject,
    getSingleCategoryinProject,
    addNewCategoryinProject,
    updateCategoryinProject,
    deleteCategoryinProject
}

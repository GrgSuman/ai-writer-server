import { Prisma } from "@prisma/client";
import prisma from "../../lib/db";
import { slugify } from "../../lib/slugify";
import AppError from "../../utils/appError";

const getAllCategoriesinProject = async (projectId: string) => {
        const categories = await prisma.category.findMany({
             where: { projectId },
             include: {
                _count: {
                    select: { posts: true }
                }
             }
        });
        if (!categories) {
            throw new AppError("No categories found", 404);
        }
        return categories;
}

const getSingleCategoryinProject = async ( categoryId: string) => {
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
            include: {
                posts: true
            }
        });
        if (!category) {
            throw new AppError("Category not found", 404);
        }
        return category;
}


const addNewCategoryinProject = async (projectId: string, name: string) => {
    try{
        const category = await prisma.category.create({ data: { projectId, name, slug: slugify(name) } });  
        if (!category) {
            throw new AppError("Failed to add category", 400);
        }
        return category;
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === 'P2002') {
                throw new AppError("Category with this name already exists", 400);
            }
        }
        throw new AppError("Failed to add category", 400);
    }
}

const updateCategoryinProject = async (categoryId: string, name: string) => {
    try{
        const category = await prisma.category.update({ where: { id: categoryId }, data: { name, slug: slugify(name) } });
        if (!category) {
            throw new AppError("Failed to update category", 400);
        }
        return category;
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === 'P2002') {
                throw new AppError("Category with this name already exists", 400);
            }
        }
        throw new AppError("Failed to update category", 400);
    }           
}

const deleteCategoryinProject = async ( categoryId: string) => {
    const category = await prisma.category.delete({ where: { id: categoryId } });
    if (!category) {
        throw new AppError("Failed to delete category", 400);
    }
    return category;
}

export default {
    getAllCategoriesinProject,
    getSingleCategoryinProject,
    addNewCategoryinProject,
    updateCategoryinProject,
    deleteCategoryinProject
}

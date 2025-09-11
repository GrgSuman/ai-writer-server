import { Prisma } from "@prisma/client";
import prisma from "../../lib/db";
import { slugify } from "../../lib/slugify";
import AppError from "../../utils/appError";

// Get all categories in a project
// This function is used to get all categories in a project
// It takes a projectId as a parameter and returns all categories in the project
// It returns all categories in the project
// @route GET /api/projects/:projectId/categories
const getAllCategoriesinProject = async (projectId: string) => {
    // First validate that the project exists
    const projectExists = await prisma.project.findUnique({
        where: { id: projectId, isActive: true }
    });

    if (!projectExists) {
        throw new AppError("Project not found", 404);
    }

    const categories = await prisma.category.findMany({
        where: { projectId },
        include: {
            _count: {
                select: { posts: true }
            }
        }
    });

    return categories;
}

// Get a single category in a project by categoryId
// This function is used to get a single category in a project by categoryId
// It takes a categoryId as a parameter and returns a single category in the project
// It returns a single category in the project
// @route GET /api/projects/:projectId/categories/:categoryId
const getSingleCategoryinProject = async (categoryId: string, apiKey?: boolean) => {
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
        include: {
            posts: {
                where: apiKey ? {} : { isDraft: false },
            }
        }
    });
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    return category;
}

// Get a single category in a project by slug
// This function is used to get a single category in a project by slug
// It takes a categorySlug as a parameter and returns a single category in the project
// It returns a single category in the project
// @route GET /api/projects/:projectId/categories/slug/:categorySlug
const getSingleCategoryinProjectBySlug = async (categorySlug: string, apiKey?: boolean) => {
    const category = await prisma.category.findFirst({
        where: { slug: categorySlug },
        include: {
            posts: {
                where: apiKey ? {} : { isDraft: false },
            }
        }
    });
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    return category;
}

// Add a new category in a project
// This function is used to add a new category in a project
// It takes a projectId and name as parameters and adds the category
// It returns the added category
// @route POST /api/projects/:projectId/categories
const addNewCategoryinProject = async (projectId: string, name: string) => {
    try {

        //check if the category already exists ignoring the case
        const categoryExists = await prisma.category.findFirst({
            where: {
              projectId,
              name: {
                equals: name,
                mode: "insensitive",
              },
            },
          });
          
        if (categoryExists) {
            throw new AppError("Category with this name already exists", 400);
        }

        const category = await prisma.category.create({ data: { projectId, name, slug: slugify(name) } });
        if (!category) {
            console.log("Failed to add category", projectId, name);
            throw new AppError("Failed to add category", 400);
        }
        return category;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new AppError("Category with this name already exists", 400);
            }
        }
        console.log("Failed to add category", error


            
        );
        throw new AppError("Failed to add category", 400);
    }
}


// Add a new category in a project
// This function is used to add multiple categories in a project
// It takes a projectId and name as parameters and adds the categories
// It returns the added category
// @route POST /api/projects/:projectId/categories/multiple
const addMultipleCategoriesinProject = async (projectId: string, names: string[]) => {
    try {
        const categories = await prisma.category.createMany({ data: names.map(name => ({ projectId, name, slug: slugify(name) })) });
        if (!categories) {
            throw new AppError("Failed to add categories", 400);
        }
        return categories;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new AppError("Category with this name already exists", 400);
            }
        }
        throw new AppError("Failed to add category", 400);
    }
}

// Update a category in a project
// This function is used to update a category in a project
// It takes a categoryId and name as parameters and updates the category
// It returns the updated category
// @route PUT /api/projects/:projectId/categories/:categoryId
const updateCategoryinProject = async (categoryId: string, name: string) => {
    try {
        const category = await prisma.category.update({ where: { id: categoryId }, data: { name, slug: slugify(name) } });
        if (!category) {
            throw new AppError("Failed to update category", 400);
        }
        return category;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new AppError("Category with this name already exists", 400);
            }
        }
        throw new AppError("Failed to update category", 400);
    }
}

// Delete a category in a project
// This function is used to delete a category in a project
// It takes a categoryId as a parameter and deletes the category
// It returns the deleted category
// @route DELETE /api/projects/:projectId/categories/:categoryId
const deleteCategoryinProject = async (categoryId: string) => {
    const category = await prisma.category.delete({ where: { id: categoryId } });
    if (!category) {
        throw new AppError("Failed to delete category", 400);
    }
    return category;
}

export default {
    getAllCategoriesinProject,
    getSingleCategoryinProject,
    getSingleCategoryinProjectBySlug,
    addNewCategoryinProject,
    addMultipleCategoriesinProject,
    updateCategoryinProject,
    deleteCategoryinProject
}

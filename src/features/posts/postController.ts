import { NextFunction, Request, Response } from "express";
import prisma from "../../lib/db";
import { slugify } from "../../lib/slugify";

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params

    try {
        // Check if projectId exists
        const categoriesByProject = await prisma.project.findUnique({
            where: {
                 id: projectId 
            },
            select: {
                categorys: true
            }
        });

        if (!categoriesByProject) {
            res.status(400).json({
                "success": false,
                "message": `Project with ID ${projectId} not found`
            });
            return
        }
        res.json({
            "success": true,
            "message": "success",
            "data": categoriesByProject
        })
    }
    catch (e) {
        next(e)
    }

}
export const getSingleCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const categories = await prisma.category.findUnique({
         where: { id: categoryId },
         include:{
            posts:true
        }
        })
    res.json({
        "success": true,
        "message": "success",
        "data": categories
    })
}
export const addNewCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            "success": false,
            "message": "category name is required"
        });
        return
    }
    try {
        // Check if projectId exists
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!project) {
            res.status(400).json({
                "success": false,
                "message": `Project with ID ${projectId} not found`
            });
            return
        }

        // Check if category already exists (case insensitive)
        const existingCategory = await prisma.category.findUnique({ where: { name } });

        if (existingCategory) {
            console.log('Category already exists');
            throw new Error('Category already exists');
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                slug: slugify(name),
                projectId
            }
        });

        res.json({
            "success": true,
            "message": "success",
            "data": newCategory
        })

    } catch (error) {
        next(error)
    }

}
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, categoryId } = req.params;
    const { name } = req.body;

    if (!name) {
        res.status(400).json({
            "success": false,
            "message": "Category name is required"
        });
        return
    }

    try {
        // Check if projectId exists
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!project) {
            res.status(400).json({
                "success": false,
                "message": `Project with ID ${projectId} not found`
            });
            return
        }

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!existingCategory) {
            res.status(404).json({
                "success": false,
                "message": `Category with ID ${categoryId} not found`
            });
            return
        }

        // Update the category
        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: {
                name,
                slug: slugify(name), // Re-generate the slug
                projectId
            }
        });

        res.json({
            "success": true,
            "message": "Category updated successfully",
            "data": updatedCategory
        });

    } catch (error) {
        next(error); // Pass error to global error handler
    }
};
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, categoryId } = req.params;
    try {
        // Check if projectId exists
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!project) {
            res.status(400).json({
                "success": false,
                "message": `Project with ID ${projectId} not found`
            });
            return
        }

        // Check if category exists
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!category) {
            res.status(404).json({
                "success": false,
                "message": `Category with ID ${categoryId} not found`
            });
            return
        }

        // Delete the category
        await prisma.category.delete({
            where: { id: categoryId }
        });

        res.json({
            "success": true,
            "message": `Category with ID ${categoryId} deleted successfully`
        });

    } catch (error) {
        next(error); // Pass error to global error handler
    }
};




export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany({})
    res.json({
        "success": true,
        "message": "success",
        "data": posts
    })
}

export const getSinglePost = async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, slug } = req.params;
    console.log(req.params)
    res.json({
        "success": true,
        "message": "success",
        "data": slug,
        "projectId": projectId
    })
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
    const { name, description, systemPrompt } = req.body;
    if (!name) {
        res.status(400).json({
            "success": false,
            "message": "all fields are required to update project"
        });
        return
    }

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
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


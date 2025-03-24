import categoryService from "./categoryService";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

/**
 * @route GET /api/projects/:projectId/categories
 * @desc Get all categories in a project
 * @access Public
 */
export const getAllCategoriesinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const categories = await categoryService.getAllCategoriesinProject(projectId);
    res.json({
        "success": true,
        "message": "success",
        "data": categories
    });
})

/**
 * @route GET /api/projects/:projectId/categories/:categoryId
 * @desc Get a single category in a project
 * @access Public
 */
export const getSingleCategoryinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId, categoryId } = req.params;
    const category = await categoryService.getSingleCategoryinProject(projectId, categoryId);
    if (!category) {
        res.status(404).json({
            "success": false,
            "message": "Category not found"
        });
        return;
    }
    res.json({
        "success": true,
        "message": "success",
        "data": category
    });
})  

/**
 * @route POST /api/projects/:projectId/categories
 * @desc Add a new category in a project
 * @access Public
 */
export const addNewCategoryinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { name } = req.body;
    if (!name) {
         res.status(400).json({     
            "success": false,
            "message": "Name is required"
        });
        return;
    }
    const category = await categoryService.addNewCategoryinProject(projectId, name);
    res.json({
        "success": true,
        "message": "success",
        "data": category
    });
})

/**
 * @route PUT /api/projects/:projectId/categories/:categoryId
 * @desc Update a category in a project
 * @access Public
 */
export const updateCategoryinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId, categoryId } = req.params;
    const { name } = req.body;
    const category = await categoryService.updateCategoryinProject(projectId, categoryId, name);
    res.json({
        "success": true,
        "message": "success",
        "data": category
    });
})

/**
 * @route DELETE /api/projects/:projectId/categories/:categoryId
 * @desc Delete a category in a project
 * @access Public
 */
export const deleteCategoryinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId, categoryId } = req.params;
    const category = await categoryService.deleteCategoryinProject(projectId, categoryId);
    res.json({
        "success": true,
        "message": "success",
        "data": category
    });
})





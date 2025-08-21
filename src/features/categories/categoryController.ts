import categoryService from "./categoryService";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/appError";
/**
 * @route GET /api/projects/:projectId/categories
 * @desc Get all categories in a project including posts under the category
 * @access Private
 */
export const getAllCategoriesinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const categories = await categoryService.getAllCategoriesinProject(projectId);
    sendResponse({res, data: categories});
})

/**
 * @route GET /api/projects/:projectId/categories/:categoryId
 * @desc Get a single category in a project including posts under the category
 * @access Private
 */
export const getSingleCategoryinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    const category = await categoryService.getSingleCategoryinProject(categoryId);
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    sendResponse({res, data: category});
})  


/**
 * @route GET /api/projects/:projectId/categories/:slug
 * @desc Get a single category in a project by slug is easy in SEO for frontend
 * @access Private
 */
export const getSingleCategoryinProjectBySlug =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { categorySlug } = req.params;

    const category = await categoryService.getSingleCategoryinProjectBySlug(categorySlug);
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    sendResponse({res, data: category});
})  

/**
 * @route POST /api/projects/:projectId/categories
 * @desc Add a new category in a project
 * @access Private
 */
export const addNewCategoryinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    const { projectId } = req.params;
    if (!name) {
        throw new AppError("Category name is required", 400);
    }
    if(name.length < 3){
        throw new AppError("Category name must be at least 3 characters long", 400);
    }
    if(name.length > 20){
        throw new AppError("Category name must be less than 20 characters long", 400);
    }

    const category = await categoryService.addNewCategoryinProject(projectId, name);
    sendResponse({res, message: "Category created successfully", data: category});
})



/**
 * @route PUT /api/projects/:projectSlug/categories/:categoryId
 * @desc Update a category in a project
 * @access Private
 */
export const updateCategoryinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    if (!name) {
        throw new AppError("Category name is required", 400);
    }
    if(name.length < 3){
        throw new AppError("Category name must be at least 3 characters long", 400);
    }
    if(name.length > 20){
        throw new AppError("Category name must be less than 20 characters long", 400);
    }

    const category = await categoryService.updateCategoryinProject(categoryId, name);
    sendResponse({res, message: "Category updated successfully", data: category});
})

/**
 * @route DELETE /api/projects/:projectSlug/categories/:categoryId
 * @desc Delete a category in a project
 * @access Private
 */
export const deleteCategoryinProject =  expressAsyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const category = await categoryService.deleteCategoryinProject(categoryId);
    sendResponse({res, message: "Category deleted successfully", data: category});
})





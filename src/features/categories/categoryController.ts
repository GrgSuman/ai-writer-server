import categoryService from "./categoryService";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import projectService from "../projects/projectService";
import { CustomRequest } from "../../types/customRequest";
/**
 * @route GET /api/projects/:projectSlug/categories
 * @desc Get all categories in a project
 * @access Public
 */
export const getAllCategoriesinProject =  expressAsyncHandler(async (req: CustomRequest, res: Response) => {

    const categories = await categoryService.getAllCategoriesinProject(req?.project?.id || "");
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
export const getSingleCategoryinProject =  expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { categoryId } = req.params;

    const category = await categoryService.getSingleCategoryinProject(req?.project?.id || "", categoryId);
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
 * @route GET /api/projects/:projectId/categories/:categorySlug
 * @desc Get a single category in a project
 * @access Public
 */
export const getSingleCategoryinProjectBySlug =  expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { categorySlug } = req.params;

    const category = await categoryService.getSingleCategoryinProjectBySlug(req?.project?.id || "", categorySlug);
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
 * @route POST /api/projects/:projectSlug/categories
 * @desc Add a new category in a project
 * @access Public
 */
export const addNewCategoryinProject =  expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { name } = req.body;
    if (!name) {
         res.status(400).json({     
            "success": false,
            "message": "Name is required"
        });
        return;
    }

    const category = await categoryService.addNewCategoryinProject(req?.project?.id || "", name);
    if (!category) {
        res.status(400).json({
            "success": false,
            "message": "Failed to add category"
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
 * @route PUT /api/projects/:projectSlug/categories/:categoryId
 * @desc Update a category in a project
 * @access Public
 */
export const updateCategoryinProject =  expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name) {
        res.status(400).json({
            "success": false,
            "message": "Name is required"
        });
        return;
    }

    const category = await categoryService.updateCategoryinProject(req?.project?.id || "", categoryId, name);
    res.json({
        "success": true,
        "message": "success",
        "data": category
    });
})

/**
 * @route DELETE /api/projects/:projectSlug/categories/:categoryId
 * @desc Delete a category in a project
 * @access Public
 */
export const deleteCategoryinProject =  expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { categoryId } = req.params;
    const category = await categoryService.deleteCategoryinProject(req?.project?.id || "", categoryId);
    res.json({
        "success": true,
        "message": "success",
        "data": category
    });
})





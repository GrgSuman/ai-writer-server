import { Request, Response } from "express";
import postService, { CreatePostInterface } from "./postService";
import expressAsyncHandler from "express-async-handler";
import categoryService from "../categories/categoryService";
import { CustomRequest } from "../../types/customRequest";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/appError";
/**
 * @route GET /api/projects/:projectId/posts
 * @desc Get all posts in a project
 * @access Public
 */
export const getAllPosts = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const posts = await postService.getAllPosts(projectId);
    sendResponse({res, data: posts});
})


/**
 * @route GET /api/projects/:projectId/posts/:postId
 * @desc Get a single post in a project
 * @access Public
 */
export const getSinglePost = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { postId } = req.params;
    const post = await postService.getSinglePost(postId);
    sendResponse({res, data: post});
})

/**
 * @route GET /api/projects/:projectId/posts/slug/:postSlug
 * @desc Get a single post in a project
 * @access Public
 */
export const getSinglePostBySlug = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { postSlug } = req.params;
    const post = await postService.getSinglePostBySlug(postSlug);
    sendResponse({res, data: post});
})


/**
 * @route POST /api/projects/:projectId/posts
 * @desc Add a new post in a project
 * @access Public
 */
export const addNewPost = expressAsyncHandler(async (req: Request, res: Response) => {
    const postData = req.body;
    const { projectId } = req.params;

    // Validate required fields
    const requiredFields = ['title', 'slug', 'description', 'keywords', 'content', 'categoryId'];
    const missingFields = requiredFields.filter(field => !postData[field]);

    if (missingFields.length > 0) {
        throw new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }
    // Validate category exists
    const category = await categoryService.getSingleCategoryinProject(postData.categoryId);

    if (!category) {
        throw new AppError(`Category with ID ${postData.categoryId} not found`, 404);
    }

    const data = { 
        title: postData.title,
        slug: postData.slug,
        description: postData.description,
        keywords: postData.keywords,
        content: postData.content,
        projectId:projectId,
        categoryId: postData.categoryId,
        author: postData.author,
        thumbnail: postData.thumbnail,
        isDraft: postData.isDraft,
        isUpdated: postData.isUpdated,
        isFeatured: postData.isFeatured,
        createdAt : postData.createdAt || new Date(),
        updatedAt : postData.updatedAt || new Date()
    }

    const post = await postService.addNewPost(data);
    sendResponse({res, message: "Post created successfully", data: post});
});


/**
 * @route PUT /api/projects/:projectId/posts/:postId
 * @desc Update post in a project and category
 * @access Public
 */
export const updatePost = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { postId } = req.params;
    const { projectId } = req.params;

    const postData = req.body;
     // Validate required fields
    const requiredFields = ['title', 'slug', 'description', 'keywords', 'content', 'categoryId'];
    const missingFields = requiredFields.filter(field => !postData[field]);

    if (missingFields.length > 0) {
        throw new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }

    // Check if category exists
    const categoryCheck = await categoryService.getSingleCategoryinProject(postData.categoryId);
    if (!categoryCheck) {
        throw new AppError(`Category with ID ${postData.categoryId} not found`, 404);
    }

    const data: CreatePostInterface = { 
        title: postData.title,
        slug: postData.slug,
        description: postData.description,
        keywords: postData.keywords,
        content: postData.content,
        projectId:projectId,
        categoryId: postData.categoryId,
        author: postData.author,
        thumbnail: postData.thumbnail,
        isDraft: postData.isDraft,
        isUpdated: postData.isUpdated,
        isFeatured: postData.isFeatured,
        createdAt : postData.createdAt,
        updatedAt : postData.updatedAt
    }

    const post = await postService.updatePost(postId, data);
    sendResponse({res, message: "Post updated successfully", data: post});
})

/**
 * @route DELETE /api/projects/:projectId/posts/:postId
 * @desc Delete post in a project
 * @access Public
 */
export const deletePost = expressAsyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const post = await postService.deletePost( postId);
    sendResponse({res, message: "Post deleted successfully", data: post});
})

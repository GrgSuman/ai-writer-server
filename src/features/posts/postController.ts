import { Request, Response } from "express";
import postService from "./postService";
import expressAsyncHandler from "express-async-handler";
import projectService from "../projects/projectService";
import categoryService from "../categories/categoryService";

/**
 * @route GET /api/projects/:projectId/posts
 * @desc Get all posts in a project
 * @access Public
 */
export const getAllPosts = expressAsyncHandler( async (req: Request, res: Response) => {
    const { projectId } = req.params;
    //check if projectId is valid
    const project = await projectService.getSingleProjectById(projectId);
    if (!project) {
        res.status(400).json({
            "success": false,
            "message": `Project with ID ${projectId} not found`
        })
        return;
    }
    const posts = await postService.getAllPosts(projectId);
    res.json({
        "success": true,
        "message": "success",
        "data": posts
    })
})


/**
 * @route GET /api/projects/:projectId/posts/:slug
 * @desc Get a single post in a project
 * @access Public
 */
export const getSinglePost = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId, slug } = req.params;
    //check if projectId is valid
    const project = await projectService.getSingleProjectById(projectId);
    if (!project) {
        res.status(400).json({
            "success": false,   
            "message": `Project with ID ${projectId} not found`
        })
        return;
    }
    const post = await postService.getSinglePost(projectId, slug);    
    if (!post) {
        res.status(400).json({
            "success": false,
            "message": `Post with slug ${slug} not found`
        })
        return;
    }   
    res.json({
        "success": true,
        "message": "success",
        "data": post
    })
})


/**
 * @route POST /api/projects/:projectId/posts
 * @desc Add a new post in a project
 * @access Public
 */
export const addNewPost = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;

    const { title, slug, description, keywords, content, categoryId,
        author, thumbnail, isDraft, isUpdated, isFeatured, createdAt, updatedAt } = req.body;
   
   if (!title || !slug || !description || !keywords || !content || !categoryId) {
       res.status(400).json({
           "success": false,
           "message": "title, slug, description, keywords, content, categoryId are required"
       })
       return;
   }  

    //check if projectId is valid
    const project = await projectService.getSingleProjectById(projectId);
    if (!project) {
        res.status(400).json({
            "success": false,
            "message": `Project with ID ${projectId} not found`
        })
        return;
    }

    // Check if category exists
    const category = await categoryService.getSingleCategoryinProject(projectId, categoryId);
    if (!category) {
        res.status(404).json({
            "success": false,
            "message": `Category with ID ${categoryId} not found`
        });
        return;
    }

     
    const data = { 
        title, slug, description, keywords, content,
        projectId, categoryId,
        author, thumbnail, isDraft, isUpdated, isFeatured,
        createdAt : createdAt || new Date(),
        updatedAt : updatedAt || new Date()
    }
    const post = await postService.addNewPost(data);
    res.json({
        "success": true,
        "message": "success",
        "data": post
    })
    
})  

/**
 * @route PUT /api/projects/:projectId/posts
 * @desc Update post in a project and category
 * @access Public
 */
export const updatePost = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId, postId } = req.params;
    const { title, slug, description, keywords, content, categoryId,
        author, thumbnail, isDraft, isUpdated, isFeatured, createdAt, updatedAt } = req.body;

    if (!title || !slug || !description || !keywords || !content || !categoryId) {
        res.status(400).json({
            "success": false,
            "message": "title, slug, description, keywords, content, categoryId are required"
        })
        return;
    }

    //check if projectId is valid
    const project = await projectService.getSingleProjectById(projectId);
    if (!project) {
        res.status(400).json({
            "success": false,
            "message": `Project with ID ${projectId} not found`
        })
        return;
    }   

    // Check if category exists
    const category = await categoryService.getSingleCategoryinProject(projectId, categoryId);
    if (!category) {
        res.status(404).json({
            "success": false,
            "message": `Category with ID ${categoryId} not found`
        });
        return;
    }
    
    const data = {
        title, slug, description, keywords, content, categoryId, projectId,
        author, thumbnail, isDraft, isUpdated, isFeatured,
        createdAt, updatedAt
    }

    const post = await postService.updatePost(postId, data);
    res.json({
        "success": true,
        "message": "post updated successfully",
        "data": post
    })
})

/**
 * @route DELETE /api/projects/:projectId/posts/:postId
 * @desc Delete post in a project
 * @access Public
 */
export const deletePost = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId, postId } = req.params;
    const post = await postService.deletePost(projectId, postId);
    res.json({
        "success": true,
        "message": "post deleted successfully",
        "data": post
    })
})

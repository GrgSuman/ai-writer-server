import { Request, Response } from "express";
import postService from "./postService";
import expressAsyncHandler from "express-async-handler";
import categoryService from "../categories/categoryService";
import { CustomRequest } from "../../types/customRequest";

/**
 * @route GET /api/projects/:projectSlug/posts
 * @desc Get all posts in a project
 * @access Public
 */
export const getAllPosts = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const posts = await postService.getAllPosts(req?.project?.id || "");
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
export const getSinglePost = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { slug } = req.params;
   
    const post = await postService.getSinglePost(req?.project?.id || "", slug);
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
export const addNewPost = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const postData = req.body;

    console.log("postData", postData);

    // Validate required fields
    const requiredFields = ['title', 'slug', 'description', 'keywords', 'content', 'categoryId'];
    const missingFields = requiredFields.filter(field => !postData[field]);

    if (missingFields.length > 0) {
         res.status(400).json({
            success: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
        return;
    }
    console.log("req?.project?.id", req?.project?.id);
    // Validate category exists
    const category = await categoryService.getSingleCategoryinProject(req?.project?.id || "", postData.categoryId);

    if (!category) {
        res.status(404).json({
            success: false,
            message: `Category with ID ${postData.categoryId} not found`
        });
        return;
    }

    const data = { 
        title: postData.title,
        slug: postData.slug,
        description: postData.description,
        keywords: postData.keywords,
        content: postData.content,
        projectId: req?.project?.id || "",
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
    res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post
    });
});


/**
 * @route PUT /api/projects/:projectSlug/posts/:postId
 * @desc Update post in a project and category
 * @access Public
 */
export const updatePost = expressAsyncHandler(async (req: CustomRequest, res: Response) => {
    const { postId } = req.params;
    const { title, slug, description, keywords, content, categoryId,
        author, thumbnail, isDraft, isUpdated, isFeatured, createdAt, updatedAt } = req.body;

    if (!title || !slug || !description || !keywords || !content || !categoryId) {
        res.status(400).json({
            "success": false,
            "message": "title, slug, description, keywords, content, categoryId are required"
        })
        return;
    }

    // Check if category exists
    const categoryCheck = await categoryService.getSingleCategoryinProject(req?.project?.id || "", categoryId);
    if (!categoryCheck) {
        res.status(404).json({
            "success": false,
            "message": `Category with ID ${categoryId} not found`
        });
        return;
    }

    const {category, project, ...rest} = req.body;

    const post = await postService.updatePost(postId, rest);
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

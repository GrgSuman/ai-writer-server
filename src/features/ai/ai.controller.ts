import { Request, Response, text } from "express";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/appError";
import expressAsyncHandler from "express-async-handler";
import { brainstormContent, generateCategories, generateEnhancedDescription } from "./ai.service";


// Enhance project description
// @route POST /api/v1/ai/enhance-project-description
// @access Private
// @description Enhance project description
// @body {description: string}
// @returns {enhancedDescription: {description: string}}
export const enhanceProjectDescription = expressAsyncHandler(async (req: Request, res: Response) => {
    const { description } = req.body;
    if (!description) {
        throw new AppError("Description is required", 400);
    }
    if(description?.trim()?.split(" ")?.length < 30) {
        throw new AppError("Description must be at least 30 words", 400);
    }
    const enhancedDescription = await generateEnhancedDescription(description);
    sendResponse({res, data: { enhancedDescription }, message: "Project description enhanced successfully"})
})


// Generate categories
// @route POST /api/v1/ai/generate-categories
// @access Private
// @description Generate categories
// @body {description: string}
// @returns {categories: {category: string, explanation: string}}
export const generateCategoriesSuggestions = expressAsyncHandler(async (req: Request, res: Response) => {
    const { description } = req.body;
    if (!description) {
        throw new AppError("Description is required", 400);
    }
    if(description?.trim()?.split(" ")?.length < 30) {
        throw new AppError("Description is too short", 400);
    }
    const categories = await generateCategories(description);
    sendResponse({res, data: categories , message: "Categories generated successfully"})
})

// Get content ideas
// @route POST /api/v1/ai/content-ideas
// @access Private
// @description Get content ideas
// @body {query: string}
// @returns {contentIdeas: {category: string, ideas: string[], isExisting: boolean}[]}
export const getContentIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { query } = req.body;
    if (!query) {
        throw new AppError("Query is required", 400);
    }

    const desc = "wanderausguide.com australian travel blogs camping fishing hidden spots"
    const categoriesWithPosts = [
        {
            name: "AI",
            posts: ["Resume Builder", "Resume Builder", "Resume Builder", "Resume Builder", "Resume Builder"]
        }
    ]
    const contentIdeas = await brainstormContent({
        description: desc,
        categoriesWithPosts:[],
        query
    });

    sendResponse({res, data: { contentIdeas }, message: "Content ideas generated successfully"})
})


// Generate content
// @route POST /api/v1/ai/generate-content
// @access Private
// @description Generate content
// @body {query: string}
// @returns {content: string}
export const generateContent = expressAsyncHandler(async (req: Request, res: Response) => {
    const { query } = req.body;
    if (!query) {
        throw new AppError("Query is required", 400);
    }

    const content = "Content";
    sendResponse({res, data: { content }, message: "Content generated successfully"})
})


// Generate project tips
// @route POST /api/v1/ai/generate-project-tips
// @access Private
// @description Generate project tips
// @body {query: string}
// @returns {projectTips: string[]}
export const generateProjectTips = expressAsyncHandler(async (req: Request, res: Response) => {
    const { query } = req.body;
    if (!query) {
        throw new AppError("Query is required", 400);
    }

    const projectTips = [
        "Make sure to have a clear goal for your project",
        "Make sure to have a clear goal for your project"
    ]

    sendResponse({res, data: { projectTips }, message: "Project tips generated successfully"})
})
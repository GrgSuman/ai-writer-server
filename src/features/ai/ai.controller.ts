import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/appError";
import expressAsyncHandler from "express-async-handler";
import { brainstormContent, generateCategories, generateContentService, generateEnhancedDescription, generateKeywords } from "./ai.service";
import { RequestWithUser } from "../../types/customRequest";
import prisma from "../../lib/db";
import { createSimpleContext, userBlogInfo } from "../../lib/ai/queryBuilder";
import { googleRelatedQueries, googleTrendsData } from "../../lib/ai/tools";
import postService, { CreatePostInterface } from "../posts/postService";
import { slugify } from "../../lib/slugify";
import categoryService from "../categories/categoryService";
import researchService from "../research/researchService";


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
    if (description?.trim()?.split(" ")?.length < 30) {
        throw new AppError("Description must be at least 30 words", 400);
    }
    const enhancedDescription = await generateEnhancedDescription(description);
    sendResponse({ res, data: { enhancedDescription }, message: "Project description enhanced successfully" })
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
    if (description?.trim()?.split(" ")?.length < 30) {
        throw new AppError("Description is too short", 400);
    }
    const categories = await generateCategories(description);
    sendResponse({ res, data: categories, message: "Categories generated successfully" })
})

// Get content ideas
// @route POST /api/v1/ai/content-ideas
// @access Private
// @description Get content ideas
// @body {query: string}
// @returns {contentIdeas: {category: string, ideas: string[], isExisting: boolean}[]}
export const getContentIdeas = expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    const { query, projectId } = req.body;
    if (!query || !projectId) {
        throw new AppError("Query and projectId are required", 400);
    }

    // Get project description
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { description: true }
    });

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    const categoriesWithPosts = await prisma.category.findMany({
        where: { projectId },
        include: {
            posts: {
                select: { title: true }
            }
        }
    });

    // Transform for AI
    const formattedData = categoriesWithPosts.map(cat => ({
        name: cat.name,
        posts: cat.posts.map(post => post.title)
    }));


    const context = createSimpleContext(project.description as string, formattedData);

    const keywords = await generateKeywords(context, query);


    // Run all queries in parallel
    const primaryKeywordsArray = await Promise.all(
        keywords.primaryKeywords.map(keyword => googleTrendsData(keyword))
    );

    const longTailKeywordsArray = await Promise.all(
        keywords.longTailKeywords.map(keyword => googleRelatedQueries(keyword))
    );

    const finalContentIdeas = await brainstormContent({
        project_overview: context,
        primary_keywords_trends: primaryKeywordsArray.join(", "),
        longtail_keywords_trends: longTailKeywordsArray.join(", "),
        user_query: query
    });


    sendResponse({ res, data: finalContentIdeas, message: "Content ideas generated successfully" })
})


// Generate content
// @route POST /api/v1/ai/generate-content
// @access Private
// @description Generate content
// @body {query: string}
// @returns {content: string}
export const generateContent = expressAsyncHandler(async (req: Request, res: Response) => {
    const { title, description, keywords, audience, tone, id,
         length, searchIntent, trendInsights, category, isNewCategory, projectId } = req.body;

    if (!title || !description || !keywords || !audience || !tone || !length) {
        throw new AppError("All fields are required to generate content", 400);
    }

    const content = userBlogInfo(title, description, keywords, audience, tone, length, searchIntent, trendInsights);

    const structuredResult = await generateContentService(content);

    let newCategoryId = category;
    if (isNewCategory) {
        const newCategory = await categoryService.addNewCategoryinProject(projectId, category);
        newCategoryId = newCategory.id;
    }

    const postData: CreatePostInterface = {
        title: title,
        slug: slugify(title),
        description: description,
        keywords: keywords.join(", "),
        content: structuredResult.content,
        categoryId: newCategoryId,
        projectId: projectId,
    }

    const post = await postService.addNewPost(postData);
    if(id){
        await researchService.deleteResearchContentIdeas(id);
    }

    sendResponse({
        res,
        data: post,
        message: "Content generated successfully"
    });
});

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

    sendResponse({ res, data: { projectTips }, message: "Project tips generated successfully" })
})
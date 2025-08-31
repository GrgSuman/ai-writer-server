import { chatModel } from "../../lib/ai/models";
import { emojiPrompt, enhanceProjectDescriptionPrompt, finalContentIdeasPrompt, keywordsResearchPrompt, recommendCategoriesPrompt } from "../../lib/ai/prompts";
import { finalContentIdeasSchema, keywordsResearchSchema, recommendCategoriesSchema } from "../../lib/ai/schemas";
import AppError from "../../utils/appError";

// Get emoji based on text
// @param text: string
// @returns emoji: string
export const getEmojiBasedOnText =async (text: string) => {
    if (!text) {
        throw new AppError("Text is required", 400);
    }
    const chain = emojiPrompt.pipe(chatModel)
    const emoji = await chain.invoke({input: text})

    return emoji.content.toString().trim()
}

// Generate enhanced description
// @param description: string
// @returns enhancedDescription: {description: string} 
export const generateEnhancedDescription = async (description: string) => {
    if (!description) {
        throw new AppError("Description is required", 400);
    }
    if(description?.trim()?.split(" ")?.length < 30) {
        throw new AppError("Description must be at least 10 words", 400);
    }
    const chain = enhanceProjectDescriptionPrompt.pipe(chatModel)
    const enhancedDescription = await chain.invoke({input: description})
    return enhancedDescription.content.toString().trim()
}

// Generate categories for the blog
// @param description: string
// @returns categories: {category: string[], explanation: string} 
export const generateCategories = async (description: string) => {
    if (!description) {
        throw new AppError("Description is required", 400);
    }
    const chain = recommendCategoriesPrompt.pipe(chatModel.withStructuredOutput(recommendCategoriesSchema))
    const categories = await chain.invoke({input: description})
    return categories
}

// Generate keywords
// @param context: string
// @returns keywords: {keyword: string}
export const generateKeywords = async (context: string, query: string) => {
    if (!context) {
        throw new AppError("Context is required", 400);
    }
    const chain = keywordsResearchPrompt.pipe(chatModel.withStructuredOutput(keywordsResearchSchema))
    const keywords = await chain.invoke({
        blog_overview: context,
        user_query: query
    })
    return keywords
}

// Brainstorm content
// @param description: string
// @returns brainstormContent: {category: string, isExisting: boolean, posts: {title: string, keywords: string[], description: string, audience: string, tone: string, length: string}[]}
export const brainstormContent = async ({project_overview, primary_keywords_trends, longtail_keywords_trends, user_query}:{project_overview: string, primary_keywords_trends: string, longtail_keywords_trends: string, user_query: string}) => {
    const chain = finalContentIdeasPrompt.pipe(chatModel.withStructuredOutput(finalContentIdeasSchema))
    const brainstormContent = await chain.invoke({
       project_overview,
       primary_keywords_trends,
       longtail_keywords_trends,
       user_query
    })
    return brainstormContent
}
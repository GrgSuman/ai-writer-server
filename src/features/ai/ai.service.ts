import { chatModel } from "../../lib/ai/models";
import { brainstormContentPrompt, emojiPrompt, enhanceProjectDescriptionPrompt, recommendCategoriesPrompt } from "../../lib/ai/prompts";
import { brainstormContentSchema, recommendCategoriesSchema } from "../../lib/ai/schemas";
import { BrainstormInput } from "../../lib/ai/types";
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


// Brainstorm content
// @param description: string
// @returns brainstormContent: {category: string, isExisting: boolean, posts: {title: string, keywords: string[], description: string, audience: string, tone: string, length: string}[]}
export const brainstormContent = async ({description, categoriesWithPosts, query}: BrainstormInput) => {
    const chain = brainstormContentPrompt.pipe(chatModel.withStructuredOutput(brainstormContentSchema))
    const brainstormContent = await chain.invoke({
        description:description,
        categoriesWithPosts:categoriesWithPosts,
        query:query
    })
    return brainstormContent
}
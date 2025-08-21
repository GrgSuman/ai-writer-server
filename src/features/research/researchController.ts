import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import researchService from "./researchService";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/appError";

/**
 * @route GET /api/projects/:projectId/research-content-ideas
 * @desc Get research content ideas for a project
 * @access Private
 */
export const getResearchContentIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const researchContentIdeas = await researchService.getResearchContentIdeas(projectId);
    sendResponse({res, data: researchContentIdeas})
})


/**
 * @route POST /api/projects/:projectId/research-content-ideas
 * @desc Add research content ideas for a project
 * @access Private
 */

export const addResearchContentIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { title, keywords, description, wordCount, postFormat, whyGoodIdea } = req.body;
    if(!title || !keywords || !description || !wordCount || !postFormat || !whyGoodIdea){
        throw new AppError("All fields are required to add research content ideas", 400);
    }
    if(typeof wordCount !== "number"){
        throw new AppError("Word count must be a number", 400);
    }
    const researchContentIdeas = await researchService.addResearchContentIdeas(projectId, title, keywords, description, wordCount, postFormat, whyGoodIdea);
    sendResponse({res, message: "Research content ideas added successfully", data: researchContentIdeas})
})

/**
 * @route PUT /api/projects/:projectId/research-content-ideas/:researchContentIdeasId
 * @desc Update research content ideas for a project
 * @access Private
 */

export const updateResearchContentIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { researchContentIdeasId } = req.params;
    const { title, keywords, description, wordCount, postFormat, whyGoodIdea } = req.body;
    if(!title || !keywords || !description || !wordCount || !postFormat || !whyGoodIdea){
        throw new AppError("All fields are required to update research content ideas", 400);
    }
    if(typeof wordCount !== "number"){
        throw new AppError("Word count must be a number", 400);
    }
    const researchContentIdeas = await researchService.updateResearchContentIdeas(researchContentIdeasId, title, keywords, description, wordCount, postFormat, whyGoodIdea);
    sendResponse({res, message: "Research content ideas updated successfully", data: researchContentIdeas})
})

/**
 * @route DELETE /api/projects/:projectId/research-content-ideas/:researchContentIdeasId
 * @desc Delete research content ideas for a project
 * @access Private
 */
export const deleteResearchContentIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { researchContentIdeasId } = req.params;
        const deletedResearchContentIdeas = await researchService.deleteResearchContentIdeas(researchContentIdeasId);
    sendResponse({res, message: "Research content ideas deleted successfully", data: deletedResearchContentIdeas})
})


    
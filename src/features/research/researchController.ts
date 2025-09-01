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
    const { title, description, keywords, audience, tone, length, searchIntent, suggestedCategory, trendInsights } = req.body;
    
    if(!title || !description || !keywords || !audience || !tone || !length || !searchIntent || !suggestedCategory || !trendInsights){
        throw new AppError("All fields are required to add research content ideas", 400);
    }
    
    if(!Array.isArray(keywords)){
        throw new AppError("Keywords must be an array of strings", 400);
    }
    
    const researchContentIdeas = await researchService.addResearchContentIdeas(
        projectId, 
        title, 
        description, 
        keywords, 
        audience, 
        tone, 
        length, 
        searchIntent, 
        suggestedCategory, 
        trendInsights
    );
    sendResponse({res, message: "Research content ideas added successfully", data: researchContentIdeas})
})

/**
 * @route PUT /api/projects/:projectId/research-content-ideas/:researchContentIdeasId
 * @desc Update research content ideas for a project
 * @access Private
 */

export const updateResearchContentIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { researchContentIdeasId } = req.params;
    const { title, description, keywords, audience, tone, length, searchIntent, suggestedCategory, trendInsights } = req.body;
    
    if(!title || !description || !keywords || !audience || !tone || !length || !searchIntent || !suggestedCategory || !trendInsights){
        throw new AppError("All fields are required to update research content ideas", 400);
    }
    
    if(!Array.isArray(keywords)){
        throw new AppError("Keywords must be an array of strings", 400);
    }
    
    const researchContentIdeas = await researchService.updateResearchContentIdeas(
        researchContentIdeasId, 
        title, 
        description, 
        keywords, 
        audience, 
        tone, 
        length, 
        searchIntent, 
        suggestedCategory, 
        trendInsights
    );
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


    
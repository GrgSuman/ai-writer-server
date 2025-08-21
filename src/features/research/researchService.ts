import prisma from "../../lib/db";
import AppError from "../../utils/appError";

// Get research content ideas for a project
// This function is used to get research content ideas for a project
// It takes a projectId as a parameter and returns research content ideas for the project
// It returns research content ideas for the project
// @route GET /api/projects/:projectId/research-content-ideas
const getResearchContentIdeas = async (projectId: string) => {
    console.log(projectId)
    try {
        const researchContentIdeas = await prisma.researchContentIdeas.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return researchContentIdeas;
    } catch (error) {
        throw new AppError("Error fetching research content ideas", 500);
    }
}

// Add research content ideas for a project
// This function is used to add research content ideas for a project
// It takes a projectId, title, keywords, description, wordCount, postFormat and whyGoodIdea as parameters and adds research content ideas for the project
// It returns the added research content ideas
// @route POST /api/projects/:projectId/research-content-ideas
const addResearchContentIdeas = async (projectId: string, title: string, keywords: string, description: string, wordCount: number, postFormat: string, whyGoodIdea: string[]) => {
    try {
        // Check for duplicate title
        const existingIdea = await prisma.researchContentIdeas.findFirst({
            where: {
                projectId,
                title
            }
        });

        if (existingIdea) {
            throw new AppError("Research content idea with this title already exists", 400);
        }

        const researchContentIdeas = await prisma.researchContentIdeas.create({
            data: {
                projectId,
                title,
                keywords,
                description,
                wordCount,
                postFormat,
                whyGoodIdea
            }
        });
        return researchContentIdeas;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Error creating research content ideas", 500);
    }
}

// Update research content ideas for a project
// This function is used to update research content ideas for a project
// It takes a researchContentIdeasId, title, keywords, description, wordCount, postFormat and whyGoodIdea as parameters and updates the research content ideas
// It returns the updated research content ideas
// @route PUT /api/projects/:projectId/research-content-ideas/:researchContentIdeasId

const updateResearchContentIdeas = async (researchContentIdeasId: string, title: string, keywords: string, description: string, wordCount: number, postFormat: string, whyGoodIdea: string[]) => {
    const researchContentIdeas = await prisma.researchContentIdeas.update({
        where: { id: researchContentIdeasId },
        data: { title, keywords, description, wordCount, postFormat, whyGoodIdea }
    });
    if (!researchContentIdeas) {
        throw new AppError("Error updating research content ideas", 404);
    }
    return researchContentIdeas;
}

// Delete research content ideas for a project
// This function is used to delete research content ideas for a project
// It takes a researchContentIdeasId as a parameter and deletes the research content ideas
// It returns the deleted research content ideas
// @route DELETE /api/projects/:projectId/research-content-ideas/:researchContentIdeasId
const deleteResearchContentIdeas = async (id: string) => {
    const researchContentIdeas = await prisma.researchContentIdeas.delete({ where: { id } });
    if (!researchContentIdeas) {
        throw new AppError("Error deleting research content ideas", 404);
    }
    return researchContentIdeas;
}

const researchService = {
    getResearchContentIdeas,
    addResearchContentIdeas,
    updateResearchContentIdeas,
    deleteResearchContentIdeas
}

export default researchService
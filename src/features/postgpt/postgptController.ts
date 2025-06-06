import { Request, Response } from "express";
import { callGemini } from "../../lib/geminiPrompt";
import { filterJsonString } from "../../lib/filterJson";
import AppError from "../../utils/appError";
import sendResponse from "../../utils/sendResponse";
import expressAsyncHandler from "express-async-handler";
// import postService from "../posts/postService";
// import { Post } from "@prisma/client";

/**
 * @route POST /api/postgpt/summary
 * @desc Generate a summary and insights from provided content
 * @access Public
 */
export const generateSummary = expressAsyncHandler(async (req: Request, res: Response) => {

    const { content } = req.body;
    if (!content) {
        throw new AppError("content is required", 400);
    }

    const prompt = `As a highly skilled content summarization and insight extraction expert, your task is to analyze and synthesize information from diverse blog posts to facilitate the creation of original content. You will be provided with blog post content and must generate a structured response that includes the following sections:
                    Summary: Compose a concise and comprehensive overview of the blog post's main themes, arguments, and conclusions. The summary should capture the essence of the content without excessive detail.
                    Key Insights: Identify and extract the most significant points, emerging trends, notable statistics, or unique perspectives presented in the blog post. Focus on information that offers valuable understanding or challenges conventional wisdom.
                    Actionable Takeaways: Translate the blog post's content into practical, actionable advice or recommendations. These takeaways should be directly applicable to real-world scenarios and provide clear guidance for the user.
                    Potential New Angles: Propose fresh perspectives, unexplored aspects, or extensions of the blog post's topic that could serve as the basis for a new, original blog post. These suggestions should aim to offer novel insights or address gaps in the existing content.
                    Your goal is to extract and synthesize information from the provided blog post content to enable the creation of new, original blog posts. Avoid direct copying of the original content, except for factual information that is universally accepted. The output should be structured and easy to understand, facilitating the efficient use of the extracted information in the content creation process.
                    Strictly give me response in string format no need of markdown or html content.
                    Blog Content:
                    ${content}`;
    const data = await callGemini(prompt);
    sendResponse({ res, data });
})

/**
 * @route POST /api/postgpt/outline
 * @desc Generate a detailed outline for a blog post
 * @access Public
 */
export const generateOutline = async (req: Request, res: Response) => {

    const { title, description, keywords, wordCount, writingStyle, summaryContents } = req.body;
    if (!title || !description || !keywords || !wordCount || !writingStyle) {
        res.status(400).json({
            "success": false,
            "message": "all fields are required to generate outline"
        });
        return
    }

    const prompt = `Develop a detailed, research-driven outline for a blog post, leveraging the provided title, description, keywords, word count, writing style, and summary content.
                    The summary content represents competitor website material; therefore, the outline should aim to surpass it in quality and depth, incorporating the core ideas while
                    offering a more comprehensive and insightful perspective. The outline must be structured to facilitate the writing process, ensuring a logical flow and ease of
                    expansion. The final outline should be comprehensive, well-organized, and easily adaptable for anyone writing the full blog post. It should provide a balanced
                    and thorough treatment of the topic, adhering strictly to the specified word count range. The outline's clarity and ease of use are paramount, ensuring that it
                    is straightforward and simple to follow.

                    Title: ${title}
                    Description: ${description}
                    Keywords: ${keywords}
                    Word Count: ${wordCount}
                    Writing Style: ${writingStyle}
                    Summary Contents: ${summaryContents}
                `;

    try {
        const data = await callGemini(prompt);
        res.json({
            "success": true,
            "message": "success",
            data
        })
    }
    catch (e) {
        res.status(400).json({
            "success": false,
            "message": "something went wrong",
        })
    }
}

/**
 * @route POST /api/postgpt/generate
 * @desc Generate a complete blog post with SEO optimization
 * @access Public
 */
export const generateAIPost = expressAsyncHandler(async (req: Request, res: Response) => {
    const { topic, category, keyPoints, keywords, audience, goal, tone,
        format, wordCount, referenceSources, additionalInstructions } = req.body.data;

    if (!topic || !keyPoints || !keywords || !audience || !category) {
        throw new AppError("topic, keyPoints, keywords and audience are required to generate post", 400);
    }

    const postPrompt = {
        prompt: `As a professional SEO blogger with expertise in creating high-ranking, engaging content,
        your task is to generate a blog post based on the following user-provided information. The generated content must
       be original, written in simple English (suitable for the specified 'audience'), and should not sound like generic
        AI output. While you MUST utilize the insights and information from the 'referenceSources' to ensure accuracy
         and comprehensiveness, avoid direct copying or plagiarism. Aim to rephrase, synthesize, and add unique value
          and perspective. Structure the blog post logically using HTML formatting for readability and SEO. Ensure the
           generated title, meta description, and keywords are optimized for search engines and relevant to the 'topic'
            and 'category'. Adhere to the specified 'format' and approximate 'wordCount'. Incorporate the 'keyPoints'
             naturally within the content. Maintain the specified 'tone' throughout the article. 
             Address any 'additionalInstructions' provided by the user.
      
      Finally, strictly return a JSON object with the keys: 'title', 'description', 'keywords', and 'content'.
      
      **User Provided Information:**
      
      * **Topic:** ${topic}
      * **Key Points:** ["${keyPoints}"]
      * **Keywords:** ["${keywords}"]
      * **Audience:** "${audience}"
      * **Goal:** "${goal}"
      * **Tone:** "${tone}"
      * **Format:** "${format}"
      * **Word Count:** "${wordCount}"
      * **Reference Sources:** ["${referenceSources}"]
      * **Additional Instructions:** "${additionalInstructions}"
      * 
    Always return only the JSON output in **valid JSON inside triple backticks**:
      
      **Output Format:**
      \`\`\`json
      {
        "title": "",
        "description": "",
        "keywords": "",
        "content": ""
      }
      \`\`\`

      **Example Output:**
      
      \`\`\`json
      {
        "title": "Generated Blog Post Title",
        "description": "Generated Meta Description",
        "keywords": "Generated Keywords",
        "content": " <h1> Generated Blog Post Content in HTML Format </h1>"
      }
      \`\`\`
      `
    };
    try {
        const data = await callGemini(postPrompt.prompt);
        sendResponse({ res, data: filterJsonString(data) });
    }


    catch (e) {
        throw new AppError("something went wrong", 400);
    }
})

/**
 * @route POST /api/postgpt/title-ideas
 * @desc Generate comprehensive content ideas based on keywords, including title, format, and strategy
 * @access Public
 */
export const generateTitleIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
    const { keywords } = req.body;

    if (!keywords) {
        throw new AppError("keywords are required", 400);
    }

    const prompt = `As an expert content strategist and SEO specialist, analyze these keywords: "${keywords}" and generate 5 comprehensive content ideas.

    For each idea, provide a detailed analysis including:
    1. A compelling, SEO-optimized title
    2. Relevant keywords to target
    3. A clear, engaging description
    4. Recommended word count
    5. Best content format
    6. Why this idea would perform well
    7. Estimated read time

    Return the response in this JSON format:
    {
        "contentIdeas": [
            {
                "title": "Main title of the content",
                "keywords": "keyword1, keyword2, keyword3",
                "description": "Clear and engaging meta description of the content",
                "wordCount": estimated word count in number,
                "postFormat": "how-to, listicle, guide, case-study, etc.",
                "whyGoodIdea": [
                    "Reason 1 why this content would perform well",
                    "Reason 2 for potential success",
                    "Reason 3 for audience appeal"
                ],
            }
        ]
    }`;

    try {
        const data = await callGemini(prompt);
        sendResponse({ res, data: filterJsonString(data) });
        // sendResponse({ res, data: {
        //     "contentIdeas": [
        //         {
        //             "title": "How to make a website",
        //             "keywords": "website, make, website, website, website",
        //             "description": "Clear and engaging meta description of the content",
        //             "wordCount": 1500,
        //             "postFormat": "how-to, listicle, guide, case-study, etc.",
        //             "whyGoodIdea": [
        //                 "Reason 1 why this content would perform well",
        //                 "Reason 2 for potential success",
        //                 "Reason 3 for audience appeal"
        //             ],
        //         }
        //     ]
        //  } });
        
    } catch (e) {
        throw new AppError("Failed to generate content ideas", 400);
    }
});

/**
 * @route POST /api/postgpt/generate-related-ideas
 * @desc Generate content ideas based on existing posts in the database
 * @access Public
 */
// export const generateRelatedIdeas = expressAsyncHandler(async (req: Request, res: Response) => {
//     const { projectId } = req.params;
    
//     // Get existing posts from database
//     const existingPosts = await postService.getAllPosts(projectId);
    
//     // Extract titles, keywords, and categories
//     const contentAnalysis = {
//         titles: existingPosts.map((post: Post) => post.title),
//         keywords: existingPosts.flatMap((post: Post) => post.keywords),
//         categories: existingPosts.map((post: Post) => post.categoryId)
//     };

//     const prompt = `As an expert content strategist, analyze these existing content pieces and generate new, related content ideas that would complement the current content strategy.

//     Existing Content Analysis:
//     Titles: ${contentAnalysis.titles.join(', ')}
//     Keywords: ${contentAnalysis.keywords.join(', ')}
//     Categories: ${contentAnalysis.categories.join(', ')}

//     Generate 3 new content ideas that:
//     1. Fill content gaps in the current strategy
//     2. Build upon successful existing content
//     3. Target underserved topics in the same space
//     4. Create content clusters around popular topics

//     For each idea, provide:
//     {
//         "contentIdeas": [
//             {
//                 "title": "Main title of the content",
//                 "keywords": ["keyword1", "keyword2", "keyword3"],
//                 "description": "Clear and engaging description of the content",
//                 "wordCount": 2500,
//                 "postFormat": "how-to | listicle | guide | case-study",
//                 "whyGoodIdea": [
//                     "Reason 1 why this content would perform well",
//                     "Reason 2 for potential success",
//                     "Reason 3 for audience appeal"
//                 ],
//                 "estimatedReadTime": "15 min read",
//                 "relatedToExisting": [
//                     {
//                         "title": "Related existing post title",
//                         "relationship": "How this new content relates to existing content"
//                     }
//                 ],
//                 "contentCluster": "Which content cluster this belongs to"
//             }
//         ],
//         "strategyInsights": {
//             "contentGaps": "Identified gaps in current content",
//             "opportunities": "New opportunities in the space",
//             "trends": "Emerging trends in the topic area",
//             "recommendations": "Strategic recommendations for content development"
//         }
//     }`;

//     try {
//         const data = await callGemini(prompt);
//         sendResponse({ res, data: filterJsonString(data) });
//     } catch (e) {
//         throw new AppError("Failed to generate related content ideas", 400);
//     }
// });

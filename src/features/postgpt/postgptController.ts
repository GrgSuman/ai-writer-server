import { Request, Response } from "express";
import { callGemini } from "../../lib/geminiPrompt";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { filterJsonString } from "../../lib/filterJson";

export const generateSummary = async (req: Request, res: Response) => {

    const { content } = req.body;
    if (!content) {
        res.status(400).json({
            "success": false,
            "message": "content is required to generate summary"
        });
        return
    }

    const prompt = `As a highly skilled content summarization and insight extraction expert, your task is to analyze and synthesize information from diverse blog posts to facilitate the creation of original content. You will be provided with blog post content and must generate a structured response that includes the following sections:
                    Summary: Compose a concise and comprehensive overview of the blog post's main themes, arguments, and conclusions. The summary should capture the essence of the content without excessive detail.
                    Key Insights: Identify and extract the most significant points, emerging trends, notable statistics, or unique perspectives presented in the blog post. Focus on information that offers valuable understanding or challenges conventional wisdom.
                    Actionable Takeaways: Translate the blog post's content into practical, actionable advice or recommendations. These takeaways should be directly applicable to real-world scenarios and provide clear guidance for the user.
                    Potential New Angles: Propose fresh perspectives, unexplored aspects, or extensions of the blog post's topic that could serve as the basis for a new, original blog post. These suggestions should aim to offer novel insights or address gaps in the existing content.
                    Your goal is to extract and synthesize information from the provided blog post content to enable the creation of new, original blog posts. Avoid direct copying of the original content, except for factual information that is universally accepted. The output should be structured and easy to understand, facilitating the efficient use of the extracted information in the content creation process.
                    Blog Content:
                    ${content}`;
    try {
        // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // const result = await model.generateContent(prompt);
        // const data = result.response.text();
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
            // data:"outline"
        })
    }
    catch (e) {
        res.status(400).json({
            "success": false,
            "message": "something went wrong",
        })
    }
}

export const generateAIPost = async (req: Request, res: Response) => {
    console.log(req.body)
    const { title, description, keywords, wordCount, writingStyle, summaryContents, outline } = req.body;
    if (!title || !description || !keywords || !wordCount || !writingStyle || !summaryContents || !outline) {
        console.log("error")
        res.status(400).json({
            "success": false,
            "message": "all fields are required to generate outline"
        });
        return
    }
    const prompt = `
            Based on the provided data, create a comprehensive and SEO-optimized blog post that surpasses the quality and depth of existing competitor content. 
            The blog post should include a compelling title, a concise meta description, and a strategic use of relevant keywords to enhance search engine 
            visibility without sacrificing readability. The content should offer unique perspectives, actionable advice, and in-depth analysis to resonate
            with readers and establish authority in the subject matter. The blog post should be written in the specified writing style and adhere to the word count. 
            The summary contents from competitor blogs and the provided outline should be used as a foundation for generating original and insightful content. The title,
            description, keywords, word count, writing style, summary contents, and outline are:

        *   **Title:** ${title}
        *   **Description:** ${description}
        *   **Keywords:** ${keywords}
        *   **Word Count:** ${wordCount}
        *   **Writing Style:** ${writingStyle}
        *   **Summary Contents:** ${summaryContents} (from competitor blogs)
        *   **Outline:** ${outline}
        * 
        As a result, it should return json object with the following structure:
            {
                "title": "Generated Blog Post Title",
                "description": "Generated Meta Description",
                "keywords": "Generated Keywords",
                "content": "Generated Blog Post Content in HTML Format",
                "wordCount": "Generated Word Count",
                "timeToRead": "Estimated Time to Read the blog post",
            }
        
    `
    try {
        const data = await callGemini(prompt);

        res.json({
            "success": true,
            "message": "success",
            "data": filterJsonString(data)
            // "data":{
            //     "title": "Generated Blog Post Title",
            //     "description": "Generated Meta Description",
            //     "keywords": "Generated Keywords",
            //     "content": " <h1> Generated Blog Post Content in HTML Format </h1>",
            //     "wordCount": "Generated Word Count",
            //     "timeToRead": "Estimated Time to Read the blog post",
            // }
        })
    }


    catch (e) {
        console.log("error in e")
        res.status(400).json({
            "success": false,
            "message": "something went wrong",
        })
    }
}
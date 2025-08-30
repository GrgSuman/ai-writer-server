import { ChatPromptTemplate } from "@langchain/core/prompts";

export const emojiPrompt = ChatPromptTemplate.fromMessages([
    ["system", "Return only one simple emoji for the given text. No text, no quotes, just a single emoji character."],
    ["user", "{input}"],
]);

export const enhanceProjectDescriptionPrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `Rewrite and expand the user's brief blog/project description into a comprehensive, detailed description that clearly establishes:
  
        1. **Core Topic & Niche**: What specific subject matter or domain this covers
        2. **Target Audience**: Who this is designed for (demographics, skill level, interests)
        3. **Primary Purpose**: The main goal (educate, entertain, solve problems, build community, etc.)
        4. **Content Types**: What kinds of posts, articles, or content will be featured
        5. **Unique Value**: What makes this blog distinctive or valuable
        6. **Tone & Style**: The intended voice and approach
        
        Structure as 3-5 clear, specific sentences (100-150 words total) that avoid marketing hype and focus on concrete details. Use the original language style but expand significantly on scope and intent.
        This enhanced description should give an AI system enough context to understand the blog's mission and recommend relevant content ideas.`
    ],
    ["user", "{input}"],
]);


export const recommendCategoriesPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a content strategy expert specializing in blog categorization. Based on the user's blog/project description, recommend 4-5 strategic content categories.
  
        Guidelines:
        1. Cover Core Content Areas: Include the main topics the blog will address.
        2. Support Content Goals: Align with the blog's purpose and audience.
        3. Enable Content Planning: Provide clear buckets for organizing posts.
        4. Drive Engagement: Include categories that encourage readership and interaction.
        5. Allow for Growth: Be broad enough for future expansion.
        
        Requirements for each category:
        - Use 1-4 words per category name.
        - Make it specific enough to be meaningful but broad enough for multiple posts.
        - Avoid overlapping categories.
        - Consider SEO and searchability.
        - Indicate if the category is essential now for starting the blog using boolean field "isRequiredNow".
        
        Focus on practical, actionable categories that make sense for the blog's mission, audience, and content strategy.`
        ],
        ["user", "{input}"],
  ]);
  
export const brainstormContentPrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are an AI assistant that brainstorms blog content ideas for a project.

    Rules:
    - Use the project description, existing categories, existing post titles, and user query.
    - Categories can be existing or new depending on the need of project. If a category is essential and suggested by you, mark it as new.
    - Each category must be short and concise, ideally 1-4(max if needed) words.
    - For each category, suggest exactly 3 posts.
    - For each post under a category, generate the following metadata:
        - title: engaging and specific
        - keywords: 5–10 relevant keywords/phrases
        - description: 2–3 sentence summary of the post
        - audience: who this post is for
        - tone: formal, casual, friendly, educational, etc.
        - length: short, medium, long (relative to typical blog length)
    - Fill gaps in existing categories first, then optionally suggest 1–2 new categories if needed with posts.
    - Do not repeat existing post titles.`
    ],
    [
        "user",
        `Project description: {description}
            Categories: {categoriesWithPosts}
            User query: {query}`
    ]
]);
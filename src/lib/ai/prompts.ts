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

export const keywordsResearchPrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are an expert SEO keyword researcher specializing in blog content optimization.

        Your task is to generate 8-12 highly relevant keywords and search phrases for the given topic.

        KEYWORD CATEGORIES:
        • Primary Keywords (1-2 words): 5-10 main topic terms for Google Trends
        • Long-tail Keywords (3-6 words): 5-8 specific phrases for content ideas, "how to", "what is", "best", "why" type queries, specific to the blog's geographic or niche focus

        RESEARCH GUIDELINES:
        • Focus on search terms people actually use on Google
        • Consider seasonal trends and current events in the niche
        • Include both informational and transactional search intent
        • Prioritize keywords with good search volume and low competition
        • Match the blog's target audience demographics and interests
        • Include emerging trends and new technologies in the field

        QUALITY CRITERIA:
        • Must be directly related to the user's query if provided
        • Should have clear search intent (informational, navigational, commercial)
        • Avoid overly broad or generic terms
        • Include location-specific terms if relevant
        • Consider the blog's authority level and target audience
        `
    ],
    [
        "user",
        `
            BLOG CONTEXT:
            {blog_overview}

            TOPIC/QUERY:
            {user_query}

            Generate relevant keywords for this topic:`
    ]
]);

export const finalContentIdeasPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
    You are an expert content strategist and SEO researcher specializing in blog content planning.

    Your task is to generate post ideas based on the provided context.

    GUIDELINES:
    - Use the existing project categories if they are relevant
    - Suggest new categories only if there is a clear gap
    - Generate 5-10 post ideas
    - Include insights from trends and related queries to prioritize topics
    - Align with the blog's niche, audience, and the user query
    - Focus on primary and long-tail keywords for content relevance
    - Keep posts actionable, specific, and search-intent driven
    - Consider seasonality and emerging trends where relevant
    `
  ],
  [
    "user",
    `
    PROJECT OVERVIEW:
    {project_overview}

    PRIMARY KEYWORDS & TRENDS:
    {primary_keywords_trends}

    LONG-TAIL KEYWORDS & RELATED QUERIES:
    {longtail_keywords_trends}

    USER QUERY:
    {user_query}
`
  ]
]);

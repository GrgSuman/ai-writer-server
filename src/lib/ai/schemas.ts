import { z } from "zod";


export const recommendCategoriesSchema = z.object({
  categories: z.array(
    z.object({
      category: z.string().min(1).max(50)
        .describe("Category name, short and concise, ideally 1-4 words"),
      isRequiredNow: z.boolean()
        .describe("Whether this category is essential to start the blog immediately"),
    })
  ).min(4).max(5)
    .describe("4-5 categories for the blog"),
});


export const keywordsResearchSchema = z.object({
  primaryKeywords: z
    .array(z.string())
    .describe("1-2 word primary keywords, used for Google Trends")
    .min(5)
    .max(10),
  longTailKeywords: z
    .array(z.string())
    .describe("3-6 word long-tail keywords for content ideas")
    .min(5)
    .max(8)
});


export const finalContentIdeasSchema = z.object({
  contentIdeas: z.array(
    z.object({
      title: z.string().describe("Engaging and SEO-optimized blog post title"),
      keywords: z.array(z.string()).describe("5-10 relevant keywords for this post"),
      description: z.string().describe("2-3 sentence summary explaining the post's value"),
      audience: z.string().describe("Target audience for this post"),
      tone: z.string().describe("Tone/style: formal, casual, friendly, educational, etc."),
      length: z.string().describe("Post length: short, medium, long"),
      searchIntent: z.string().describe("Primary search intent: informational, navigational, commercial"),
      suggestedCategory: z.string().describe("Optional category suggestion, or null if no specific category"),
      trendInsights: z.string().describe("Any relevant trend insights that influenced this post idea, or null if none")
    })
  ).min(5).max(10).describe("5-10 content ideas total")
});


export const BlogPostSchema = z.object({
  title: z.string().describe("SEO-optimized blog post title"),
  content: z.string().describe("Full blog post content in html format"),
  metaDescription: z.string().describe("Meta description for SEO"),
  keywords: z.array(z.string()).describe("Relevant tags/keywords"),
  thubmnailImagePrompt: z.string().describe("Prompt for generating thumbnail image"),
});
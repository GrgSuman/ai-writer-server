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

export const brainstormContentSchema = z.object({
  categories: z.array(
    z.object({
      category: z.string().describe("Category name, short and concise, ideally 1-4(max if needed) words"),
      isExisting: z.boolean().describe("Whether this category already exists"),
      posts: z.array(
        z.object({
          title: z.string().describe("Title of the blog post"),
          keywords: z.array(z.string()).describe("5-10 relevant keywords"),
          description: z.string().describe("Brief summary of the post"),
          audience: z.string().describe("Target audience for this post"),
          tone: z.string().describe("Tone/style of the post"),
          length: z.string().describe("Relative post length: short, medium, long")
        })
      )
    })
  )
});

import { ChatOpenAI } from "@langchain/openai";

// Default Chat Model
export const chatModel = new ChatOpenAI({
  modelName: "gpt-4o-mini", 
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY,
});

export const blogWriterModel = new ChatOpenAI({
  modelName: "gpt-4o", 
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY,
});
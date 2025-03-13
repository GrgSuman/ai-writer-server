import { GoogleGenerativeAI } from "@google/generative-ai";

export const callGemini = async(prompt: string) => {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const data = result.response.text();
        return data;
}
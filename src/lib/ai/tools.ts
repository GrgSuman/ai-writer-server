const googleTrends = require('google-trends-api');
import { summarizeKeywordTrends, summarizeRelatedQueries } from './queryBuilder';
import { tool } from "@langchain/core/tools";
import { z } from "zod";



export const googleTrendsData = async (keyword: string) => {
    try {
        const result = await googleTrends.interestOverTime({
            keyword,
            startTime: new Date('2023-01-01'),
            endTime: new Date('2024-01-01'),
            geo: '', // worldwide
            hl: 'en-US'
        });

        const parsedData = JSON.parse(result);
        
        // Extract the timeline data
        const timelineData = parsedData.default.timelineData;

        // Transform to a more usable format
        const formattedTimelineData = timelineData.map((item: any) => ({
            date: new Date(parseInt(item.time) * 1000), // Convert Unix timestamp
            formattedDate: item.formattedTime,
            value: item.value[0],
        }));

        const naturalSummary = summarizeKeywordTrends(keyword, formattedTimelineData)

        return naturalSummary
    } catch (error) {
        console.error('Error fetching Google Trends data:', error);
        return { error: true, message: 'Google Trends tool is currently unavailable' };
    }
}

export const googleRelatedQueries = async (keyword: string) => {
    try {
        const result = await googleTrends.relatedQueries({
            keyword: keyword,
        });
        const resultJson = JSON.parse(result)
        const formattedResult = summarizeRelatedQueries(resultJson, keyword)
        return formattedResult
    } catch (error) {
        console.error('Error fetching Google Related Queries:', error);
        return { error: true, message: 'Related queries tool is currently unavailable' };
    }
}

export const perplexityApi = async (query: string) => {
    const system = `
  You are a meticulous fact-checker and real-time information researcher.
  - Use only verifiable, up-to-date sources from the live web.
  - Provide citations with direct URLs for each claim.
  - If uncertain, note it clearly and explain why.
  - Prefer primary sources, official documents, filings, and reputable outlets.
  - Be concise; avoid hallucination or opinion.
  - Return facts as bullet points for easy reading.
    `;
  
    const user = `
  Task: Verify or update the following information with the most recent, accurate facts:
  "${query}"
  
  Instructions:
  1. Return concise, up-to-date information.
  2. Format as bullet points.
  3. If information conflicts, explain briefly.
  4. Do not add opinions or unrelated info.
    `;
  
    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "sonar",
          temperature: 0.1,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user }
          ]
        })
      });
  
      const data = await response.json();
      // Return only the content of the first message for easy use
      return data.choices?.[0]?.message?.content || "No data returned";
    } catch (error) {
      console.error("Perplexity API Error:", error);
      return "Error fetching data from Perplexity.";
    }
  };

  export const perplexitySearchTool = tool(
    async (query: string) => {
      return await perplexityApi(query); 
    },
    {
      name: "perplexity_search",
      description: "Fetch up-to-date verified facts, statistics, and citations from the live web.",
    }
  );

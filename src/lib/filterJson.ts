import { jsonrepair } from "jsonrepair";

export function filterJsonString(inputString:string) {
  try {
    return JSON.parse(jsonrepair(inputString));
  } catch (repairError) {
    console.error("Even jsonrepair failed:", repairError);
    return null;
  }
    // try {
    //   // Find JSON content between triple backticks with "json" language marker
    //   const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    //   const match = inputString.match(jsonRegex);
      
    //   if (!match || !match[1]) {
    //     throw new Error("No JSON content found within ```json ``` tags");
    //   }
      
    //   // Parse the extracted content to verify it's valid JSON
    //   const extractedJson = match[1].trim();
    //   const parsedJson = JSON.parse(extractedJson);
      
    //   // Return the parsed JSON object
    //   return parsedJson;
    // } catch (error) {
    //   console.error("Error processing JSON:", error);
    //   return null;
    // }
  }
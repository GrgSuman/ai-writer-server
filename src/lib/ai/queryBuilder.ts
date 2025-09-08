interface FormattedCategoryData {
  name: string;
  posts: string[];
}

export interface TrendDataPoint {
  date: string;          // ISO string of the date
  formattedDate: string; // e.g., "Jan 1 – 7, 2023"
  value: number;         // interest value
}

interface GoogleTrendsResult {
  default: {
    rankedList: Array<{
      rankedKeyword: Array<{
        query: string;
        value: number;
        formattedValue: string;
        hasData: boolean;
        link: string;
      }>;
    }>;
  };
}

/**
 * Creates a simple context string for LLM based on blog data
 */
export const createSimpleContext = (description: string, categoriesWithPosts: FormattedCategoryData[]): string => {
  const totalPosts = categoriesWithPosts.reduce((sum, cat) => sum + cat.posts.length, 0);
  const categoryCount = categoriesWithPosts.length;
  
  let context = `BLOG OVERVIEW:
${description}

CURRENT CONTENT STATUS:
This blog has ${categoryCount} categories with a total of ${totalPosts} posts published.

CATEGORIES AND POSTS:`;

  categoriesWithPosts.forEach(cat => {
    context += `\n\n• ${cat.name} (${cat.posts.length} posts):`;
    if (cat.posts.length > 0) {
      cat.posts.forEach(post => {
        context += `\n  - ${post}`;
      });
    } else {
      context += `\n  - No posts yet`;
    }
  });
  
  return context;
};

/**
 * Formats Google Trends related queries data into a clean, readable format for AI
 */
export function summarizeRelatedQueries(apiResponse: GoogleTrendsResult, originalQuery: string) {
  const rankedLists = apiResponse?.default?.rankedList || [];

  if (rankedLists.length === 0) return `No related queries found for "${originalQuery}".`;

  let summary = `Search trends for ${originalQuery}: `;

  rankedLists.forEach((list, idx) => {
    const rankedKeywords = list?.rankedKeyword || [];
    if (rankedKeywords.length === 0) return;

    summary += idx === 0 
      ? "Current relative interest includes " 
      : "Breakout/rising interest includes ";

    const terms = rankedKeywords.map(k => `${k.query} (${k.formattedValue || k.value})`);
    summary += terms.join(", ") + ". ";
  });

  return summary.trim();
}


export function summarizeKeywordTrends(keyword: string, trendData: TrendDataPoint[]) {
  if (!trendData || trendData.length === 0) return `No search interest data found for "${keyword}".`;

  // Find min, max, average values
  const values = trendData.map(d => d.value);
  const maxValue = Math.max(...values);
  const avgValue = values.reduce((a,b) => a+b, 0) / values.length;

  // Determine interest level
  let interestLevel = "low";
  if (avgValue > 50) interestLevel = "high";
  else if (avgValue > 25) interestLevel = "moderate";

  // Check if it's trending
  const recentValues = values.slice(-4); // Last 4 data points
  const recentAvg = recentValues.reduce((a,b) => a+b, 0) / recentValues.length;
  const isTrending = recentAvg > avgValue * 1.2; // 20% higher than average

  // Construct simple presence summary
  let summary = `${keyword} shows ${interestLevel} search interest (average: ${avgValue.toFixed(1)}/100). `;
  
  if (isTrending) {
    summary += `Interest is currently trending upward. `;
  }
  
  if (maxValue > 70) {
    summary += `Has reached peak popularity. `;
  }

  return summary;
}


export const userBlogInfo = (title: string, description: string, keywords: string[], audience: string, tone: string, length: string, searchIntent?: string, trendInsights?: string) => {
  let output = `
  Title: ${title}
  Description: ${description}
  Keywords: ${keywords}
  Audience: ${audience}
  Tone: ${tone}
  Length: ${length}
`;

  if (searchIntent) {
    output += `  Search Intent: ${searchIntent}\n`;
  }
  if (trendInsights) {
    output += `  Trend Insights: ${trendInsights}\n`;
  }

  return output;
}
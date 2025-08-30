const googleTrends = require('google-trends-api');

export const googleTrendsData = async (keywords: string[]) => {
    try {
        const result = await googleTrends.interestOverTime({
            keyword: keywords,
            startTime: new Date('2023-01-01'),
            endTime: new Date('2024-01-01'),
            geo: '', // worldwide
            hl: 'en-US'
        });
        
        const parsedData = JSON.parse(result);
        
        // Extract the timeline data
        const timelineData = parsedData.default.timelineData;

        console.log(timelineData)
        
        // Transform to a more usable format
        return timelineData.map((item: any) => ({
            date: new Date(parseInt(item.time) * 1000), // Convert Unix timestamp
            formattedDate: item.formattedTime,
            javascript: item.value[0],
            python: item.value[1]
        }));
        
    } catch (error) {
        console.error('Error fetching Google Trends data:', error);
        return { error: true, message: 'Google Trends tool is currently unavailable' };
    }
}

export const googleRelatedQueries = async (keywords: string[]) => {
    try {
        const result = await googleTrends.relatedQueries({
            keyword: keywords,
        });
        const resultJson = JSON.parse(result)
        return resultJson
    } catch (error) {
        console.error('Error fetching Google Related Queries:', error);
        return { error: true, message: 'Related queries tool is currently unavailable' };
    }
}
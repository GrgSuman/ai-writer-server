import * as cheerio from 'cheerio';

const webContents = async (url: string) => {
    const $ = await cheerio.fromURL(url);
    const html = $.html();
    const data =  cheerio.load(html);
    return data.text();
}

export { webContents };
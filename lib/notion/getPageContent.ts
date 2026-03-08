import { notion } from './client';

export async function getPageContent(pageId: string) {
    try {
        const page = await notion.pages.retrieve({ page_id: pageId });
        const blocks = await notion.blocks.children.list({ block_id: pageId });

        return {
            page,
            blocks: blocks.results,
        };
    } catch (error) {
        console.error('Error fetching page content:', error);
        throw error;
    }
}
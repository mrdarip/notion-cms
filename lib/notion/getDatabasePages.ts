import { notion } from "./client";

export async function getDatabasePages(databaseId: string) {
    try {
        const response = await notion.dataSources.query({
            data_source_id: databaseId,
        });

        return response.results;
    } catch (error) {
        console.error("Failed to fetch database pages:", error);
        console.error("Database ID:", databaseId);
        throw error;
    }
}
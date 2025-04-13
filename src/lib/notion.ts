import { Product } from "@/types/product";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const databaseId = process.env.NOTION_DATABASE_ID as string;

function getText(property: any): string {
    if (!property) return "";
    if (property.type === "title" && property.title.length > 0) {
        return property.title.map((t: any) => t.plain_text).join(" ");
    }
    if (property.type === "rich_text" && property.rich_text.length > 0) {
        return property.rich_text.map((t: any) => t.plain_text).join(" ");
    }
    return "";
}

function getNumber(property: any): number | null {
    if (!property) return null;
    if (property.type === "number") {
        return property.number ?? null;
    }
    // Handle string values (e.g., from Notion text/rich_text)
    if (property.type === "rich_text" && property.rich_text.length > 0) {
        const text = property.rich_text.map((t: any) => t.plain_text).join(" ");
        const num = Number(text.replace(/[^0-9.]/g, ""));
        return isNaN(num) ? null : num;
    }
    if (property.type === "title" && property.title.length > 0) {
        const text = property.title.map((t: any) => t.plain_text).join(" ");
        const num = Number(text.replace(/[^0-9.]/g, ""));
        return isNaN(num) ? null : num;
    }
    return null;
}

function getMultiSelect(property: any): string[] {
    if (!property || property.type !== "multi_select") return [];
    return property.multi_select.map((item: any) => item.name);
}

function getUrl(property: any): string {
    if (!property || property.type !== "url") return "";
    return property.url ?? "";
}

async function getAllImageUrls(pageId: string, mainImage: string): Promise<string[]> {
    const images: string[] = [];

    // Only add mainImage if it's a valid, non-empty URL
    if (typeof mainImage === "string" && mainImage.trim().length > 0) {
        images.push(mainImage.trim());
    }

    try {
        let cursor: string | undefined = undefined;
        do {
            const res = await notion.blocks.children.list({
                block_id: pageId,
                start_cursor: cursor,
                page_size: 100,
            });
            for (const block of res.results) {
                if (
                    typeof block === "object" &&
                    block &&
                    "type" in block &&
                    block.type === "image" &&
                    "image" in block &&
                    block.image
                ) {
                    if (
                        block.image.type === "external" &&
                        block.image.external &&
                        typeof block.image.external.url === "string" &&
                        block.image.external.url.trim().length > 0
                    ) {
                        images.push(block.image.external.url.trim());
                    } else if (
                        block.image.type === "file" &&
                        block.image.file &&
                        typeof block.image.file.url === "string" &&
                        block.image.file.url.trim().length > 0
                    ) {
                        images.push(block.image.file.url.trim());
                    }
                }
            }
            cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
        } while (cursor);
    } catch (e) {
        // fail silently, return what we have
    }
    // Remove duplicates and filter out empty/invalid URLs
    return Array.from(new Set(images)).filter((url) => typeof url === "string" && url.trim().length > 0);
}

import { cache } from "react";

export const fetchProducts = cache(async (): Promise<Product[]> => {
    const response = await notion.databases.query({
        database_id: databaseId,
    });

    return await Promise.all(
        response.results.map(async (page: any) => {
            const props = page.properties;
            const mainImage = getUrl(props["Image"]);
            const images = await getAllImageUrls(page.id, mainImage);

            return {
                id: page.id,
                name: getText(props["Name"]),
                description: getText(props["Description"]),
                condition: getText(props["Condition"]),
                material: getText(props["Material"]),
                weight: getNumber(props["Weight"]),
                dimensions: getText(props["Dimensions"]),
                yearMade: getNumber(props["Year Made"]),
                estimatedValue: getNumber(props["Estimated Value"]),
                tags: getMultiSelect(props["Tags"]),
                image: mainImage,
                images,
            };
        })
    );
});

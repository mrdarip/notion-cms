import { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client';
import React from 'react';
import Image from 'next/image';

import { notion } from "@/lib/notion/client";

interface BlocksContentProps {
    blocks: (PartialBlockObjectResponse | BlockObjectResponse)[];
}

export function BlocksContent({ blocks }: BlocksContentProps) {
    

    return <div>{blocks.map(async block => await renderBlock(block))}</div>;
};

async function renderBlock(block: PartialBlockObjectResponse | BlockObjectResponse): Promise<React.ReactNode> {
        if (!("type" in block)) return <p key={block.id}>Invalid block</p>;
    
        switch (block.type) {
            case 'paragraph':
                return (
                    <p key={block.id}>
                        {block.paragraph?.rich_text?.map((text: any, i: number) => (
                            <span key={i}>{text.plain_text}</span>
                        ))}
                    </p>
                );
            case 'heading_1':
                return (
                    <h1 key={block.id}>
                        {block.heading_1?.rich_text?.map((text: any, i: number) => (
                            <span key={i}>{text.plain_text}</span>
                        ))}
                    </h1>
                );
            case 'heading_2':
                return (
                    <h2 key={block.id}>
                        {block.heading_2?.rich_text?.map((text: any, i: number) => (
                            <span key={i}>{text.plain_text}</span>
                        ))}
                    </h2>
                );
            case 'heading_3':
                return (
                    <h3 key={block.id}>
                        {block.heading_3?.rich_text?.map((text: any, i: number) => (
                            <span key={i}>{text.plain_text}</span>
                        ))}
                    </h3>
                );
            case 'bulleted_list_item':
                return (
                    <li key={block.id}>
                        {block.bulleted_list_item?.rich_text?.map((text: any, i: number) => (
                            <span key={i}>{text.plain_text}</span>
                        ))}
                    </li>
                );
            case 'numbered_list_item':
                return (
                    <li key={block.id}>
                        {block.numbered_list_item?.rich_text?.map((text: any, i: number) => (
                            <span key={i}>{text.plain_text}</span>
                        ))}
                    </li>
                );
            case 'image':
                /*
                
                return (
                    <Image
                        key={block.id}
                        src={block.image?.file?.url || block.image?.external?.url || ''}
                        alt={block.image?.caption?.[0]?.plain_text || 'Notion Image'}
                        width={600}
                        height={400}
                    />
                );*/

            case 'table':
                const response = await notion.blocks.children.list({
                    block_id: block.id,
                    start_cursor: undefined,
                    page_size: 50
                })

                return (
                    <table key={block.id} border={1}>
                        <tbody>
                            {response.results.map((row: any) => (
                                <tr key={row.id}>
                                    {row.table_row?.cells.map((cell: any, i: number) => (
                                        <td key={i}>{cell[0]?.plain_text}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );


            default:
                return <p key={block.id}>Unsupported block type: {block.type}</p>;
        }
    };
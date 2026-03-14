import { DataSourceObjectResponse, PageObjectResponse, PartialDataSourceObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Post = {
    id: string;
    title: string;
    description: string | null;
    created: string;
    lastEdited: string;
}

export default async function PostsList({ posts }: { posts:(PageObjectResponse | PartialPageObjectResponse | PartialDataSourceObjectResponse | DataSourceObjectResponse)[]}) {

    const postsList = posts.map(post => {
        if (!("properties" in post)) return null
        if (!("created_time" in post)) return null

        const titleProp = post.properties["Title"]
        const title = titleProp && titleProp.type === "title" && Array.isArray(titleProp.title) && titleProp.title.length > 0
            ? titleProp.title[0].plain_text
            : "Untitled"

        const descriptionProp = post.properties["Description"]
        const description = descriptionProp && descriptionProp.type === "rich_text" && Array.isArray(descriptionProp.rich_text) && descriptionProp.rich_text.length > 0
            ? descriptionProp.rich_text[0].plain_text
            : null


        const postData: Post = {
            id: post.id,
            title,
            description,
            created: post.created_time,
            lastEdited: post.last_edited_time
        }

        return postData


    })
  return (
    <div>
        <ul>
            {postsList.map((post, index) => {
                if (!post) return null
                return (
                    <li key={index}>
                        <h2>{post.title}</h2>
                        {post.description && <p>{post.description}</p>}
                        <p>Created: {new Date(post.created).toLocaleDateString()}</p>
                        <p>Last Edited: {new Date(post.lastEdited).toLocaleDateString()}</p>
                    </li>
                )
            })}
        </ul>
    </div>
  );
}

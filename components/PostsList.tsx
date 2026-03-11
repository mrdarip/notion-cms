import { DataSourceObjectResponse, PageObjectResponse, PartialDataSourceObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Post = {
    id: string;
    title: string;
    created: string;
    lastEdited: string;
}

export default async function PostsList({ posts }: { posts:(PageObjectResponse | PartialPageObjectResponse | PartialDataSourceObjectResponse | DataSourceObjectResponse)[]}) {

    const postsList = posts.map(post => {
        if (!("properties" in post)) return null
        if (!("created_time" in post)) return null

        const titleProp = post.properties["Title"]
        if (!titleProp || titleProp.type !== "title" || !Array.isArray(titleProp.title) || titleProp.title.length === 0) return null

        const title = titleProp.title[0].plain_text || "Untitled"

        const postData: Post = {
            id: post.id,
            title,
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
                        <p>Created: {new Date(post.created).toLocaleDateString()}</p>
                        <p>Last Edited: {new Date(post.lastEdited).toLocaleDateString()}</p>
                    </li>
                )
            })}
        </ul>
    </div>
  );
}

import Link from "next/link";
import { Post } from "@/types/Post";

export default async function PostsList({ posts }: { posts: Post[] }) {

  return (
    <div>
        <ul>
            {posts.map((post, index) => {
                if (!post) return null
                return (
                    <li key={index}>
                        <Link href={`/posts/${post.id}`}>
                            <h2>{post.title}</h2>
                            {post.description && <p>{post.description}</p>}
                            <p>Created: {new Date(post.created).toLocaleDateString()}</p>
                            <p>Last Edited: {new Date(post.lastEdited).toLocaleDateString()}</p>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </div>
  );
}

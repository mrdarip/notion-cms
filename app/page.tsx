
import PostsList from "@/components/PostsList";
import { postsList } from "@/lib/notion/posts";

export default async function Home() {

  const posts = postsList

  return (
    <>
      <h1>Blog</h1>

      <PostsList posts={posts} />
    </>
  );
}
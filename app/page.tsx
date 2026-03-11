
import PostsList from "@/components/PostsList";
import { getDatabasePages } from "@/lib/notion/getDatabasePages";

export default async function Home() {


  const posts = await getDatabasePages(process.env.NOTION_DATABASE_ID || "");
  console.log("Posts:", posts);

  return (
    <>
      <h1>Blog</h1>

      <PostsList posts={posts} />
    </>
  );
}
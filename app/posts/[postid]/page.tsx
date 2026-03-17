import { BlocksContent } from "@/components/notion/BlocksContent";
import { getPageContent } from "@/lib/notion/getPageContent"
import { postsList } from "@/lib/notion/posts";

export async function generateStaticParams() {
  const paths = postsList.map(post => ({
    params: { postid: post.id }
  }));

    return paths;
};


export default async function PostPage({
    params,
}: {
    params: Promise<{ postid: string }>
}) {
    const { postid } = await params
    const post = getPageContent(postid);

    return <div>
        <h1>My Post: {postid}</h1>
        <BlocksContent blocks={(await post).blocks} />
    </div>

}
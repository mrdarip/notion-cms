import { BlocksContent } from "@/components/notion/BlocksContent";
import { getPageContent } from "@/lib/notion/getPageContent"

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
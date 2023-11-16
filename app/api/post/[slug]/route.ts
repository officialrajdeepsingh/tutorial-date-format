import { posts } from "@/app/utility/post"
import {getSlugify} from "@/app/utility/getSlugify"

export async function GET( request: Request,{ params }: { params: { slug: string } }) {

  const slug = params.slug 
  const post = posts.filter((post) => getSlugify(post.title) === slug );
  return Response.json({ post: post[0] })
}
import { posts } from "@/app/utility/post"

export async function GET(request: Request) {

  return Response.json({ posts })

}

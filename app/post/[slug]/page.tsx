import Link from "next/link";
import styles from "./post.module.css";

interface PostsType {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

import { getSlugify } from "@/app/utility/getSlugify"

async function getData(slug: string) {

  const res = await fetch(`http://localhost:3000/api/post/${slug}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Post({ params }: { params: { slug: string } }) {

  let { post } = await getData(params.slug)

  return (
    <section className={styles.main}>
      <Link href={"/"}> Back</Link>
      <div className={styles.card}>
        <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">{post.title}</h2>
        <p className="mb-4 font-medium">{post.body}</p>
      </div>
    </section>
  );
}


export async function generateStaticParams() {

  const res = await fetch("http://localhost:3000/api/posts");

  let getPosts: { posts: PostsType[] } = await res.json();

  const { posts } = getPosts

  return posts.map((post: PostsType) => ({
    slug: getSlugify(post.title),
  }))

}


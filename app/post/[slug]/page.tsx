import Link from "next/link";
import styles from "./post.module.css";
import { URL } from "@/app/utility/getURL";
import { getSlugify } from "@/app/utility/getSlugify"
import dayjs from "dayjs";

interface PostsType {
  id: number;
  title: string;
  body: string;
  userId: number;
  date: Date;
  tags: string[];
  reactions: number;
};

async function getData(slug: string) {

  const res = await fetch(`${URL}api/post/${slug}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Post({ params }: { params: { slug: string } }) {

  let { post } = await getData(params.slug)

  let getDate = dayjs(post.date).format("MMM DD, YYYY"); // https://day.js.org/docs/en/parse/string-format

  return (
    <section className={styles.main}>
      <Link href={"/"}> Back</Link>
      <div className={styles.card}>
        <time className="text-sm my-3" dateTime={post.date} title={getDate}>
          {getDate}
        </time>
        <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">{post.title}</h2>
        <p className="mb-4 font-medium">{post.body}</p>
      </div>
    </section>
  );
}


export async function generateStaticParams() {

  const res = await fetch(`${URL}api/posts`);

  let getPosts: { posts: PostsType[] } = await res.json();

  const { posts } = getPosts

  return posts.map((post: PostsType) => {
    return {
      slug: getSlugify(post.title),
    }
  })

}


import styles from "./page.module.css";
import Link from "next/link";
import { getSlugify } from "@/app/utility/getSlugify"
import { URL } from "@/app/utility/getURL"

async function getData() {

  const res = await fetch(`${URL}api/posts`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface PostsType {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export default async function Home() {

  let isTitle = "How to slugify the title or sting in JavaScript?";

  const { posts } = await getData();

  let convertIntoSlug = isTitle.toLocaleLowerCase().trim().replaceAll(" ", "-");

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}> Manually </h1>

      <div className={styles.card}>
        <h2> How to slugify the title or sting in JavaScript? </h2>
        <p>{convertIntoSlug}</p>
      </div>

      <h1 className={styles.h1}> Using NPM package </h1>

      {posts.map((post: PostsType) => {

        let slug = "/post/" + getSlugify(post.title)

        return (
          <div key={post.id} className={styles.card}>

            <Link href={slug}>
              {" "}
              <h2> {post.title} </h2>{" "}
            </Link>
            <p>{post.body}</p>
          </div>
        );
      })}
    </main>
  );
}

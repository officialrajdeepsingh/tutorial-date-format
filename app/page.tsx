import styles from "./page.module.css";
import Link from "next/link";
import { getSlugify } from "@/app/utility/getSlugify"
import { URL } from "@/app/utility/getURL"
import dayjs from "dayjs"

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
  date: Date;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export default async function Home() {

  let isTitle = "How to slugify the title or sting in JavaScript?";

  const { posts } = await getData();

  let convertIntoSlug = isTitle.toLocaleLowerCase().trim().replaceAll(" ", "-");

  let getCurrentDate = dayjs().format(); // https://day.js.org/docs/en/parse/string-format


  return (
    <main className={styles.main}>
      <h1 className={styles.h1}> Current date </h1>

      <div className={styles.card}>
        <time className="text-sm my-3" dateTime={getCurrentDate} title={getCurrentDate}>
          {getCurrentDate}
        </time>
        <h2> How to slugify the title or sting in JavaScript? </h2>
        <p>{convertIntoSlug}</p>
      </div>

      <h1 className={styles.h1}> Convert ISO8601 Date	into human-readable format. </h1>

      {posts.map((post: PostsType) => {
        let slug = "/post/" + getSlugify(post.title)
        let getDate = dayjs(post.date).format("MMM DD, YYYY");
        console.log(post.date, " and ", getDate)
        return (
          <div key={post.id} className={styles.card}>
            <time className="text-sm" dateTime={getDate} title={getDate}>
              {getDate}
            </time>
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

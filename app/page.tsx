import styles from "./page.module.css";
import slugify from "slugify";

async function getData() {
  const res = await fetch("https://dummyjson.com/posts/?limit=10");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
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
        return (
          <div key={post.userId} className={styles.card}>
            <h2> {post.title} </h2>
            <p>{post.body}</p>
          </div>
        );
      })}
    </main>
  );
}

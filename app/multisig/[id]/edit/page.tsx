import EditMultisig from "@/components/page/multisig/edit-multisig";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <EditMultisig />
    </div>
  );
}

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

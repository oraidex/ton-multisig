import DetailMultisig from "@/components/page/multisig/detail";
import styles from "./page.module.scss";

export default function Home() {
  return <DetailMultisig />;
}

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

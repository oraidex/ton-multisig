import CreateMultisig from "@/components/page/create-multisig";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.createPage}>
      <CreateMultisig />
    </div>
  );
}

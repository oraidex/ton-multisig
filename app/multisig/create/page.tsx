import CreateMultisig from "@/components/page/multisig/create-multisig";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <CreateMultisig />
    </div>
  );
}

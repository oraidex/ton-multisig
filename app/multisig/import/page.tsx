import ImportMultisig from "@/components/page/multisig/import-multisig";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <ImportMultisig />
    </div>
  );
}

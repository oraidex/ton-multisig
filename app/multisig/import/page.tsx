import ImportMultisig from "@/components/page/import-multisig";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.importPage}>
      <ImportMultisig />
    </div>
  );
}

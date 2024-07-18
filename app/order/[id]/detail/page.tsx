import EditMultisig from "@/components/page/multisig/edit-multisig";
import styles from "./page.module.scss";

export default function EidtPage() {
  return (
    <div className={styles.editPage}>
      <EditMultisig />
    </div>
  );
}

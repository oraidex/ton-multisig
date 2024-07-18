import MultisigList from "@/components/page/multisig";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.multisigPage}>
      <MultisigList />
    </div>
  );
}

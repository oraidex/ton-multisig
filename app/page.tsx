import MultisigList from "@/components/page/onboard";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.multisigPage}>
      <MultisigList />
    </div>
  );
}

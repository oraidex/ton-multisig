"use client";

import Link from "next/link";
import styles from "./index.module.scss";
import {
  useGetListMultisig,
  useMultisigActions,
} from "@/stores/multisig/selector";
import { useAuthTonAddress } from "@/stores/authentication/selector";

const MultisigList = () => {
  const tonAddress = useAuthTonAddress();
  const listMultisig = useGetListMultisig();

  return (
    <div className={styles.multisig}>
      <div className={styles.btn}>
        <Link href={"/multisig/create"} className={styles.btnCreate}>
          Create new multisig
        </Link>
        <Link href={"/multisig/import"} className={styles.btnImport}>
          Import multisig
        </Link>
      </div>

      <div className={styles.list}>
        {(listMultisig[tonAddress] || []).length && <h2>List multisigs</h2>}

        {(listMultisig[tonAddress] || []).map((multisig, key) => (
          <Link href={`/detail/${multisig}`} key={key}>
            {multisig}&nbsp;
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MultisigList;

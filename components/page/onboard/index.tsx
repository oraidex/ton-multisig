"use client";

import Link from "next/link";
import styles from "./index.module.scss";
import {
  useGetListMultisig,
  useMultisigActions,
} from "@/stores/multisig/selector";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import { reduceString } from "@/libs/utils";
import { useEffect, useState } from "react";
import useHandleMultisigServer from "@/hooks/useHandleMultisigServer";

const MultisigList = () => {
  const tonAddress = useAuthTonAddress();
  const listMultisig = useGetListMultisig();
  const [myMultisig, setMyMultisig] = useState([]);

  const { getMultisigListSnapshot } = useHandleMultisigServer();

  useEffect(() => {
    (async () => {
      const response = await getMultisigListSnapshot(tonAddress);
      if (response?.data) {
        setMyMultisig(response.data);
      }
    })();
  }, [tonAddress]);

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
        {!!(myMultisig || []).length && <h2>List multisigs</h2>}

        <div className={styles.contents}>
          {[...new Set(myMultisig || [])].map((multisig, key) => {
            const { name = "", address = "" } = multisig || {};

            return (
              <Link href={`/multisig/${address}/detail`} key={key}>
                {name}
                {/* {reduceString(multisig, 8, 8)}&nbsp; */}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultisigList;

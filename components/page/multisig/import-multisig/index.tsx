"use client";

import Loader from "@/components/commons/loader/Loader";
import { displayToast, TToastType } from "@/contexts/toasts/Toast";
import { sleep } from "@/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./index.module.scss";

const ImportMultisig = () => {
  const [loading, setLoading] = useState(false);
  const [multisig, setMultisig] = useState<string>();
  const router = useRouter();

  return (
    <div className={styles.import}>
      <div className={styles.form}>
        <label>Import Multisig:</label>
        <br />
        <br />
        <input
          type="text"
          value={multisig}
          placeholder="Multisig address . . ."
          onChange={(e) => {
            e.preventDefault();
            setMultisig(e.target.value);
          }}
        />
      </div>

      <div className={styles.control}>
        <Link className={styles.back} href={"/"}>
          Back
        </Link>
        <button
          className={styles.confirm}
          onClick={async () => {
            try {
              setLoading(true);
              await sleep(2000);

              // validate multisig ///

              router.push(`/detail/${multisig}`);
            } catch (error) {
              console.log("error", error);
              displayToast(TToastType.TX_FAILED, {
                message: "Multisig Not Found!",
              });
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading && <Loader width={22} height={22} />} &nbsp; Import
        </button>
      </div>
    </div>
  );
};

export default ImportMultisig;

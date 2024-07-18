"use client";

import useGetMultisigData from "@/hooks/useGetMutisigData";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./index.module.scss";
import { useAuthTonAddress } from "@/stores/authentication/selector";

const DetailMultisig = () => {
  const tonAddress = useAuthTonAddress();
  const { id: addressMultisig } = useParams<{ id: string }>();
  const { data } = useGetMultisigData({ addressMultisig });

  const { threshold, signers, proposers, nextOrderSeqno } = data || {};

  return (
    <div className={styles.detailPage}>
      <div className={styles.detail}>
        <label>Multisig Address:</label>

        <span className={styles.address}>{addressMultisig}</span>
        <Link href={"/"}>Switch to another multisig</Link>

        <br />

        <label>TON Balance:</label>

        {/* TODO: TON balance */}
        <span>{1.185980644} ??? TON</span>

        <label>Threshold:</label>
        {/* TODO: threshold */}
        <span>1????/{!threshold ? "--" : Number(threshold)}</span>

        <label>Signers:</label>
        <div className={styles.list}>
          {(signers || []).map((e, index) => {
            return (
              <div className={styles.item} key={index}>
                <span className={styles.id}>#{index + 1} - </span>
                <span className={styles.address}>{e.toString()}</span>
                {e.toString() === tonAddress && (
                  <span className={styles.badge}>It&apos;s You</span>
                )}
              </div>
            );
          })}
        </div>

        <label>Proposers:</label>
        <div className={styles.list}>
          {!(proposers || []).length ? (
            <span>No Proposers</span>
          ) : (
            proposers.map((e, index) => {
              return (
                <div className={styles.item} key={index}>
                  <span className={styles.id}>#1</span>
                  <span className={styles.address}>{addressMultisig}</span>
                  <span className={styles.badge}>It&apos;s You</span>
                </div>
              );
            })
          )}
        </div>

        <label>Order ID:</label>
        <span>{Number(nextOrderSeqno) || "Arbitrary"}</span>

        <Link href={`/multisig/${addressMultisig}/edit`}>
          Change multisig configuration
        </Link>

        <div className={styles.control}>
          <Link className={styles.back} href={"/"}>
            Back
          </Link>
          <Link
            className={styles.confirm}
            href={`/multisig/${addressMultisig}/order`}
          >
            Create Order
          </Link>
        </div>

        <br />

        <label>Old orders:</label>
        <div className={styles.list}>
          {/* TODO: list order */}
          {[1, 2].map((e, idx) => {
            return (
              <Link
                key={idx}
                href={`/multisig/${addressMultisig}/order/${1}`}
                className={styles.orderItem}
              >
                {"Order #1"}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailMultisig;

"use client";

import useGetMultisigData from "@/hooks/useGetMutisigData";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./index.module.scss";
import { useAuthTonAddress } from "@/stores/authentication/selector";

const DetailOrder = () => {
  const tonAddress = useAuthTonAddress();
  const { id: addressMultisig, orderId } = useParams<{
    id: string;
    orderId: string;
  }>();
  const { data } = useGetMultisigData({ addressMultisig });

  const { threshold, signers, proposers, nextOrderSeqno } = data || {};

  console.log("first", { addressMultisig, orderId });

  return (
    <div className={styles.detailPage}>
      <div className={styles.detail}>
        <label>Order ID:</label>
        <span className={styles.address}>#{orderId}</span>

        <label>Order Address:</label>
        <Link
          href={`/multisig/${addressMultisig}/detail`}
          className={styles.address}
        >
          {addressMultisig}
        </Link>

        <label>TON Balance:</label>

        {/* TODO: TON balance */}
        <span>{0} ??? TON</span>

        <label>Executed:</label>

        {/* TODO: Executed */}
        <span>Yes</span>

        <label>Approvals:</label>
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

        {/* <label>Proposers:</label>
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
        </div> */}

        <label>Expires At:</label>
        <span>{new Date().toDateString()}</span>

        <br />
        <br />

        <label>Actions:</label>
        <div className={styles.list}>
          {/* TODO: list order */}
          {[1].map((e, idx) => {
            return (
              <>
                <label>Actions #{idx}:</label>
                <br />
                <span>abc</span>
                {/* <Link
                  key={idx}
                  href={`/order/${1}`}
                  // className={styles.orderItem}
                >
                  {"Order #1"}
                </Link> */}
              </>
            );
          })}
        </div>

        <div className={styles.control}>
          <Link
            className={styles.back}
            href={`/multisig/${addressMultisig}/detail`}
          >
            Back
          </Link>
        </div>

        <br />
      </div>
    </div>
  );
};

export default DetailOrder;

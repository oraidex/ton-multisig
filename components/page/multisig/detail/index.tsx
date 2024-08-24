"use client";

import useGetMultisigData from "@/hooks/useGetMutisigData";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./index.module.scss";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import { useTonConnector } from "@/contexts/custom-ton-provider";
import { useEffect, useState } from "react";
import { Address, fromNano } from "@ton/core";
import {
  DEFAULT_BE_DATA,
  parseJsonDataFromSqlite,
} from "@/hooks/useHandleMultisigServer";
import { toUserFriendlyAddress } from "@tonconnect/sdk";

const DetailMultisig = () => {
  const [tonBalance, setTonBalance] = useState(0n);
  const tonAddress = useAuthTonAddress();
  const { id: addressMultisig } = useParams<{ id: string }>();
  const { data } = useGetMultisigData({ addressMultisig });
  const { tonClient } = useTonConnector();
  const { threshold, signers, proposers, nextOrderSeqno } = data || {
    threshold: 0,
    signers: [],
    proposers: [],
    nextOrderSeqno: 0,
  };

  const parseAddress = (address: string) => Address.parse(address);

  useEffect(() => {
    const fetchTonBalance = async () => {
      try {
        const balance = await tonClient.getBalance(
          parseAddress(addressMultisig)
        );
        setTonBalance(balance);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTonBalance();
  }, [addressMultisig, tonClient]);

  const { data: dataBE = DEFAULT_BE_DATA } = data || {};

  return (
    <div className={styles.detailPage}>
      <div className={styles.detail}>
        <label>{dataBE?.name?.toUpperCase() || "Multisig Address"}:</label>

        <span className={styles.address}>{addressMultisig}</span>
        <Link href={"/"}>Switch to another multisig</Link>

        <br />

        <label>TON Balance:</label>

        <span>{fromNano(tonBalance.toString())} TON</span>

        <label>Threshold:</label>
        <span>{`${threshold}/${signers?.length}`}</span>

        <label>Signers:</label>
        <div className={styles.list}>
          {(signers || []).map((e, index) => {
            const signersBE = parseJsonDataFromSqlite(dataBE.signers);
            const currentSigner = signersBE?.find(
              (s: any) => s.value === toUserFriendlyAddress(e.toRawString())
            );

            return (
              <div className={styles.item} key={index}>
                <span className={styles.id}>#{index + 1} - </span>
                <span className={styles.address}>
                  {toUserFriendlyAddress(e.toRawString())}
                  <span className={styles.nameSuffix}>
                    {`${currentSigner ? ` (${currentSigner.name})` : ""}`}
                  </span>
                </span>
                {tonAddress &&
                  parseAddress(e.toString()).equals(
                    parseAddress(tonAddress)
                  ) && <span className={styles.badge}> It&apos;s You</span>}
              </div>
            );
          })}
        </div>
        {proposers.length > 0 && (
          <>
            <label>Proposers:</label>
            <div className={styles.list}>
              {!(proposers || []).length ? (
                <span>No Proposers</span>
              ) : (
                proposers.map((e: Address, index: number) => {
                  const proposersBE = parseJsonDataFromSqlite(dataBE.proposers);
                  const currentProposer = proposersBE?.find(
                    (s: any) =>
                      s.value === toUserFriendlyAddress(e.toRawString())
                  );

                  return (
                    <div className={styles.item} key={index}>
                      <span className={styles.id}>#{index + 1} - </span>
                      <span className={styles.address}>
                        {toUserFriendlyAddress(e.toRawString())}
                        <span className={styles.nameSuffix}>
                          {`${
                            currentProposer ? ` (${currentProposer.name})` : ""
                          }`}
                        </span>
                      </span>
                      {tonAddress &&
                        parseAddress(e.toString()).equals(
                          parseAddress(tonAddress)
                        ) && (
                          <span className={styles.badge}> It&apos;s You</span>
                        )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        <label>Next Order Seqno:</label>
        <span>{Number(nextOrderSeqno)}</span>

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

        {Number(nextOrderSeqno) > 0 && <label>Old orders:</label>}
        <div className={styles.list}>
          {[...Array(Number(nextOrderSeqno.toString())).keys()].map(
            (e, idx) => {
              return (
                <Link
                  key={idx}
                  href={`/multisig/${addressMultisig}/order/${e}`}
                  className={styles.orderItem}
                >
                  {`Order #${e}`}
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailMultisig;

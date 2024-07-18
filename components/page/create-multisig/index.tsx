"use client";

import Link from "next/link";
import styles from "./index.module.scss";
import { useState } from "react";
import Loader from "@/components/commons/loader/Loader";
import { sleep } from "@/helper";
import useGoBackBrowser from "@/hooks/useGoBackBrowser";
import {
  useGetListMultisig,
  useMultisigActions,
} from "@/stores/multisig/selector";
import { useAuthTonAddress } from "@/stores/authentication/selector";

const CreateMultisig = () => {
  const { handleSetListMultisig } = useMultisigActions();
  const listMultisig = useGetListMultisig();
  const tonAddress = useAuthTonAddress();
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState<string>();
  // useGoBackBrowser();
  const [signers, setSigners] = useState<{ id: number; value: string }[]>([
    {
      id: 0,
      value: undefined,
    },
  ]);

  const addNewSigner = () => {
    setSigners([
      ...signers,
      {
        id: signers.length,
        value: undefined,
      },
    ]);
  };

  const removeSigner = (id: number) => {
    const newSigner = signers.filter((oldS) => oldS.id != id);

    setSigners(newSigner);
  };

  const [proposers, setProposers] = useState<{ id: number; value: string }[]>(
    []
  );

  const addNewProposers = () => {
    setProposers([
      ...proposers,
      {
        id: proposers.length,
        value: undefined,
      },
    ]);
  };

  const removeProposers = (id: number) => {
    const newProposers = proposers.filter((oldP) => oldP.id != id);

    setProposers(newProposers);
  };

  return (
    <div className={styles.createMulti}>
      <div className={styles.form}>
        <label>Signer:</label>
        <br />
        <br />
        {signers.map((s, index) => {
          return (
            <div key={`${index}-${s.id}`} className={styles.formItem}>
              <span>#{index + 1}</span>
              <input
                type="text"
                value={s.value}
                placeholder="Signer . . ."
                onChange={(e) => {
                  e.preventDefault();
                  const value = e.target.value;

                  const newSigner = signers.map((oldS) =>
                    oldS.id === s.id ? { ...oldS, value } : oldS
                  );

                  setSigners(newSigner);
                }}
              />
              {signers.length > 1 && (
                <button onClick={() => removeSigner(s.id)}>✘</button>
              )}
            </div>
          );
        })}
        <span className={styles.addNew} onClick={addNewSigner}>
          Add signer
        </span>
      </div>
      <div className={styles.form}>
        <label>Proposers:</label>
        <br />
        <br />
        {proposers.map((p, index) => {
          return (
            <div key={`${index}-${p.id}`} className={styles.formItem}>
              <span>#{index + 1}</span>
              <input
                type="text"
                value={p.value}
                placeholder="Proposer . . ."
                onChange={(e) => {
                  e.preventDefault();
                  const value = e.target.value;

                  const newProposer = proposers.map((oldP) =>
                    oldP.id === p.id ? { ...oldP, value } : oldP
                  );

                  setProposers(newProposer);
                }}
              />
              {proposers.length > 0 && (
                <button onClick={() => removeProposers(p.id)}>✘</button>
              )}
            </div>
          );
        })}
        <span className={styles.addNew} onClick={addNewProposers}>
          Add proposer
        </span>
      </div>
      <div className={styles.threshold}>
        <label>Threshold:</label>
        <br />
        <br />
        <input
          type="number"
          value={threshold}
          placeholder="Threshold . . ."
          onChange={(e) => {
            e.preventDefault();
            setThreshold(e.target.value);
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
              await sleep(5000);
              console.log("data:::::", { signers, proposers, threshold });

              if (!listMultisig[tonAddress]) {
                listMultisig[tonAddress] = [];
              }

              listMultisig[tonAddress].push("1uang");

              handleSetListMultisig({ listMultisig });
            } catch (error) {
              console.log("error", error);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading && <Loader width={22} height={22} />} &nbsp; Create
        </button>
      </div>
    </div>
  );
};

export default CreateMultisig;

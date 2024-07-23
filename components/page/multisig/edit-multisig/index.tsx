"use client";

import Loader from "@/components/commons/loader/Loader";
import { useTonConnector } from "@/contexts/custom-ton-provider";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import {
  useGetListMultisig,
  useMultisigActions,
} from "@/stores/multisig/selector";
import * as MultisigBuild from "@oraichain/ton-multiowner/dist/build/Multisig.compiled.json";
import {
  Multisig,
  MultisigConfig,
  multisigConfigToCell,
  UpdateRequest,
} from "@oraichain/ton-multiowner/dist/wrappers/Multisig";
import { Address, beginCell, Cell, storeStateInit, toNano } from "@ton/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import useGetMultisigData from "@/hooks/useGetMutisigData";
import { useParams } from "next/navigation";
import NumberFormat from "react-number-format";
import { getSenderFromConnector } from "@/helper";
import { useTonConnectUI } from "@tonconnect/ui-react";

const EditMultisig = () => {
  const { tonClient } = useTonConnector();
  const [tonConnectUI] = useTonConnectUI();
  const { id: addressMultisig } = useParams<{ id: string }>();
  const tonAddress = useAuthTonAddress();
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState<number>();
  const [signers, setSigners] = useState<{ id: number; value: string }[]>([
    {
      id: 0,
      value: undefined,
    },
  ]);
  const { data } = useGetMultisigData({ addressMultisig });
  const [proposers, setProposers] = useState<{ id: number; value: string }[]>(
    []
  );

  const addNewSigner = () => {
    setSigners([
      ...signers,
      {
        id: (signers[signers.length - 1]?.id || 0) + 1,
        value: undefined,
      },
    ]);
  };

  const removeSigner = (id: number) => {
    const newSigner = signers.filter((oldS) => oldS.id != id);
    setSigners(newSigner);
  };

  const addNewProposers = () => {
    setProposers([
      ...proposers,
      {
        id: (proposers[proposers.length - 1]?.id || 0) + 1,
        value: undefined,
      },
    ]);
  };

  const removeProposers = (id: number) => {
    const newProposers = proposers.filter((oldP) => oldP.id != id);

    setProposers(newProposers);
  };

  function onEditMultisig(
    signers: { id: number; value: string }[],
    proposers: { id: number; value: string }[],
    threshold: number
  ) {
    return async () => {
      try {
        setLoading(true);
        const updateRequest: UpdateRequest = {
          threshold,
          signers: signers.map((s) => Address.parse(s.value)),
          proposers: proposers.map((p) => Address.parse(p.value)),
          type: "update",
        };
        const expirationDate = Math.floor(Date.now() / 1000) + 60 * 1000;
        const multiSigConfig: MultisigConfig = {
          threshold,
          signers: data.signers,
          proposers: data.proposers,
          allowArbitrarySeqno: false,
        };
        const multisig = new Multisig(
          Address.parse(addressMultisig),
          undefined,
          multiSigConfig
        );
        // TODO: createHook useMultiSigContract @quangdz1704
        const multiSigContract = tonClient.open(multisig);
        const sender = getSenderFromConnector(
          tonConnectUI,
          Address.parse(tonAddress)
        );
        await multiSigContract.sendNewOrder(
          sender,
          [updateRequest],
          expirationDate,
          toNano(0.05)
        );
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
  }

  useEffect(() => {
    if (data) {
      setThreshold(Number(data.threshold));
      setSigners(
        (data.signers || []).map((s, ind) => {
          return { id: ind, value: s.toString() };
        })
      );
      setProposers(
        (data.proposers || []).map((p, ind) => {
          return { id: ind, value: p.toString() };
        })
      );
    }
  }, [data]);

  return (
    <div className={styles.createMulti}>
      <div className={styles.order}>
        <label>Order ID: {data?.nextOrderSeqno?.toString()} </label>
      </div>
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

                  console.log("value", value, s.id);
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

        <NumberFormat
          placeholder={`Threshold . . .`}
          thousandSeparator
          className={styles.input}
          decimalScale={0}
          type="text"
          value={threshold}
          onChange={() => {}}
          isAllowed={(values) => {
            const { floatValue } = values;
            // allow !floatValue to let user can clear their input
            return !floatValue || (floatValue >= 0 && floatValue <= 1e14);
          }}
          onValueChange={({ floatValue }) => {
            setThreshold(floatValue);
          }}
        />
      </div>

      <div className={styles.control}>
        <Link
          className={styles.back}
          href={`/multisig/${addressMultisig}/detail`}
        >
          Back
        </Link>
        <button
          className={styles.confirm}
          onClick={onEditMultisig(signers, proposers, threshold)}
        >
          {loading && <Loader width={22} height={22} />} &nbsp; Save
        </button>
      </div>
    </div>
  );
};

export default EditMultisig;

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
} from "@oraichain/ton-multiowner/dist/wrappers/Multisig";
import { Address, beginCell, Cell, storeStateInit, toNano } from "@ton/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import useGetMultisigData from "@/hooks/useGetMutisigData";
import { useParams } from "next/navigation";

const EditMultisig = () => {
  const { handleSetListMultisig } = useMultisigActions();
  const { connector } = useTonConnector();

  const listMultisig = useGetListMultisig();
  const tonAddress = useAuthTonAddress();
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState<number>();
  const [orderId, setOrderId] = useState<string>();
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
        id: (signers[signers.length - 1]?.id || 0) + 1,
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
    setLoading,
    signers: { id: number; value: string }[],
    proposers: { id: number; value: string }[],
    threshold: number,
    listMultisig: Record<string, string[]>,
    tonAddress: string
  ) {
    return async () => {
      try {
        setLoading(true);

        const multisigConfig: MultisigConfig = {
          threshold,
          signers: signers.map((s) => Address.parse(s.value)),
          proposers: proposers.map((p) => Address.parse(p.value)),
          allowArbitrarySeqno: false,
        };
        const multisigCode = Cell.fromBoc(
          Buffer.from(MultisigBuild.hex, "hex")
        )[0];
        const multisig = Multisig.createFromConfig(
          multisigConfig,
          multisigCode
        );
        // Deploy new multisig Wallet
        await connector.sendTransaction({
          messages: [
            {
              address: multisig.address.toString(),
              amount: toNano(0.5).toString(),
              stateInit: beginCell()
                .storeWritable(
                  storeStateInit({
                    data: multisigConfigToCell(multisigConfig),
                    code: multisigCode,
                  })
                )
                .endCell()
                .toBoc()
                .toString("base64"),
            },
          ],
          validUntil: Date.now() + 1000 * 60 * 5,
        });
        console.log({
          address: multisig.address.toString(),
          amount: toNano(1).toString(),
          stateInit: multisigConfigToCell(multisigConfig)
            .toBoc()
            .toString("base64"),
        });
        if (!listMultisig[tonAddress]) {
          listMultisig[tonAddress] = [multisig.address.toString()];
        } else {
          listMultisig[tonAddress].push(multisig.address.toString());
        }
        handleSetListMultisig({ listMultisig });
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
  }

  const { id: addressMultisig } = useParams<{ id: string }>();
  const { data } = useGetMultisigData({ addressMultisig });

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
      setOrderId(`${Number(data.nextOrderSeqno) + 1}`);
    }
  }, [data]);

  return (
    <div className={styles.createMulti}>
      <div className={styles.order}>
        <label>Order ID:</label>
        <br />
        <br />
        <input
          type="number"
          value={orderId}
          placeholder="Order Id . . ."
          onChange={(e) => {
            e.preventDefault();
            setOrderId(e.target.value);
          }}
        />
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
        <input
          type="number"
          value={threshold}
          placeholder="Threshold . . ."
          onChange={(e) => {
            e.preventDefault();
            setThreshold(Number(e.target.value));
          }}
        />
      </div>

      <div className={styles.control}>
        <Link className={styles.back} href={"/"}>
          Back
        </Link>
        <button
          className={styles.confirm}
          onClick={onEditMultisig(
            setLoading,
            signers,
            proposers,
            threshold,
            listMultisig,
            tonAddress
          )}
        >
          {loading && <Loader width={22} height={22} />} &nbsp; Save
        </button>
      </div>
    </div>
  );
};

export default EditMultisig;

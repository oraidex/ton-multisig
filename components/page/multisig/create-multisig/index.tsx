"use client";

import Loader from "@/components/commons/loader/Loader";
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
import { useState } from "react";
import styles from "./index.module.scss";
import { displayToast, TToastType } from "@/contexts/toasts/Toast";
import NumberFormat from "react-number-format";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import useHandleMultisigServer from "@/hooks/useHandleMultisigServer";

const CreateMultisig = () => {
  const { handleSetListMultisig } = useMultisigActions();
  const [tonConnectUI] = useTonConnectUI();
  const router = useRouter();

  const listMultisig = useGetListMultisig();
  const tonAddress = useAuthTonAddress();
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState<number>();
  const [name, setName] = useState<string>();
  // useGoBackBrowser();
  const [signers, setSigners] = useState<
    { id: number; value: string; name: string }[]
  >([
    {
      id: 0,
      value: undefined,
      name: undefined,
    },
  ]);

  const { addMultisigSnapshot } = useHandleMultisigServer();

  const addNewSigner = () => {
    setSigners([
      ...signers,
      {
        id: (signers[signers.length - 1]?.id || 0) + 1,
        value: undefined,
        name: undefined,
      },
    ]);
  };

  const removeSigner = (id: number) => {
    const newSigner = signers.filter((oldS) => oldS.id != id);
    setSigners(newSigner);
  };

  const [proposers, setProposers] = useState<
    { id: number; value: string; name: string }[]
  >([]);

  const addNewProposers = () => {
    setProposers([
      ...proposers,
      {
        id: (proposers[proposers.length - 1]?.id || 0) + 1,
        value: undefined,
        name: undefined,
      },
    ]);
  };

  const removeProposers = (id: number) => {
    const newProposers = proposers.filter((oldP) => oldP.id != id);

    setProposers(newProposers);
  };

  function onCreateButtonMultisig(
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
        await tonConnectUI.sendTransaction({
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
        // if (!listMultisig[tonAddress]) {
        //   listMultisig[tonAddress] = [multisig.address.toString()];
        // } else {
        //   listMultisig[tonAddress].push(multisig.address.toString());
        // }
        // handleSetListMultisig({ listMultisig });

        const dataSaveBE = {
          name,
          address: multisig.address.toString(),
          createdBy: tonAddress,
          importedBy: JSON.stringify([]),
          signers: JSON.stringify(signers),
          proposers: JSON.stringify(proposers),
        };
        await addMultisigSnapshot(dataSaveBE);

        router.push(`/multisig/${multisig.address}/detail`);
      } catch (error) {
        console.log("error", error);
        displayToast(TToastType.TX_FAILED, {
          message: typeof error === "string" ? error : JSON.stringify(error),
        });
      } finally {
        setLoading(false);
      }
    };
  }

  return (
    <div className={styles.createMulti}>
      <div className={styles.form}>
        <label>Name:</label>
        <br />
        <br />
        <div className={styles.formItem}>
          <input
            type="text"
            value={name}
            placeholder="Multisig name . . ."
            onChange={(e) => {
              e.preventDefault();
              const value = e.target.value;
              setName(value);
            }}
          />
        </div>
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
                value={s.name}
                placeholder="Signer name . . ."
                onChange={(e) => {
                  e.preventDefault();
                  const value = e.target.value;

                  const newSigner = signers.map((oldS) =>
                    oldS.id === s.id ? { ...oldS, name: value } : oldS
                  );

                  setSigners(newSigner);
                }}
              />
              <input
                type="text"
                value={s.value}
                placeholder="Signer address . . ."
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
                value={p.name}
                placeholder="Proposer name . . ."
                onChange={(e) => {
                  e.preventDefault();
                  const value = e.target.value;

                  const newProposer = proposers.map((oldP) =>
                    oldP.id === p.id ? { ...oldP, name: value } : oldP
                  );

                  setProposers(newProposer);
                }}
              />
              <input
                type="text"
                value={p.value}
                placeholder="Proposer address . . ."
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
        <Link className={styles.back} href={"/"}>
          Back
        </Link>
        <button
          className={styles.confirm}
          onClick={onCreateButtonMultisig(
            setLoading,
            signers,
            proposers,
            threshold,
            listMultisig,
            tonAddress
          )}
        >
          {loading && <Loader width={22} height={22} />} &nbsp; Create
        </button>
      </div>
    </div>
  );
};

export default CreateMultisig;

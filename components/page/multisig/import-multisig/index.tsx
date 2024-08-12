"use client";
import Loader from "@/components/commons/loader/Loader";
import { displayToast, TToastType } from "@/contexts/toasts/Toast";
import { sleep } from "@/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./index.module.scss";
import useGetMultisigData, { getMultisigData } from "@/hooks/useGetMutisigData";
import {
  useGetListMultisig,
  useMultisigActions,
} from "@/stores/multisig/selector";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import { useTonConnector } from "@/contexts/custom-ton-provider";
import { Address } from "@ton/core";
import useHandleMultisigServer, {
  DEFAULT_BE_DATA,
  parseJsonDataFromSqlite,
} from "@/hooks/useHandleMultisigServer";
import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { reduceString } from "@/libs/utils";

const ImportMultisig = () => {
  const [loading, setLoading] = useState(false);
  const [multisig, setMultisig] = useState<string>();
  const router = useRouter();
  const { getMultisigDetail } = useGetMultisigData({});
  const { handleSetListMultisig } = useMultisigActions();
  const listMultisig = useGetListMultisig();
  const tonAddress = useAuthTonAddress();
  const { tonClient } = useTonConnector();
  const { getMultisigDetailSnapshot, updateMultisigSnapshot } =
    useHandleMultisigServer();

  const onImport = async () => {
    try {
      setLoading(true);
      const fmtMultisig = multisig.trim();
      const isDeployed = await tonClient.isContractDeployed(
        Address.parse(fmtMultisig)
      );
      if (!isDeployed) {
        throw "Contract not deployed!";
      }

      const dataMultisig = await getMultisigDetail(fmtMultisig);

      if (!dataMultisig) {
        throw "Not a Multisig contract";
      }

      const dataSnapshot = await getMultisigDetailSnapshot(fmtMultisig);
      const importedBy = parseJsonDataFromSqlite(
        dataSnapshot?.data?.importedBy
      );

      const updateIncluded = Array.from(
        new Set([...(importedBy || []), tonAddress])
      );

      console.log("first", updateIncluded);

      const { data: dataBE = DEFAULT_BE_DATA } = dataMultisig || {};
      await updateMultisigSnapshot(
        fmtMultisig,
        {
          ...dataBE,
          address: dataBE.address || fmtMultisig,
          name:
            dataBE.name || reduceString(dataBE.address || fmtMultisig, 8, 8),
          proposers:
            dataBE.proposers ||
            JSON.stringify(
              dataMultisig.proposers.map((e) =>
                toUserFriendlyAddress(e.toRawString())
              )
            ),
          signers:
            dataBE.signers ||
            JSON.stringify(
              dataMultisig.signers.map((e) =>
                toUserFriendlyAddress(e.toRawString())
              )
            ),
          importedBy: JSON.stringify(updateIncluded),
        },
        tonAddress
      );

      // if (!listMultisig[tonAddress]) {
      //   listMultisig[tonAddress] = [fmtMultisig];
      // } else {
      //   const checkExist = listMultisig[tonAddress].includes(fmtMultisig);
      //   !checkExist && listMultisig[tonAddress].push(fmtMultisig);
      // }
      // handleSetListMultisig({ listMultisig });

      router.push(`/multisig/${fmtMultisig}/detail`);
    } catch (error) {
      console.log("error", error);
      displayToast(TToastType.TX_FAILED, {
        message: typeof error === "string" ? error : JSON.stringify(error),
      });
    } finally {
      setLoading(false);
    }
  };
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
        <button className={styles.confirm} onClick={onImport}>
          {loading && <Loader width={22} height={22} />} &nbsp; Import
        </button>
      </div>
    </div>
  );
};

export default ImportMultisig;

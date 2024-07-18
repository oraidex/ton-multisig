"use client";

import Loader from "@/components/commons/loader/Loader";
import { displayToast, TToastType } from "@/contexts/toasts/Toast";
import { sleep } from "@/helper";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
import { Multisig } from "@oraichain/ton-multiowner/dist/wrappers/Multisig";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import { getHttpEndpoint } from "@orbs-network/ton-access";

export const getMultisigData = async (
  address: Address,
  tonClient: TonClient
) => {
  try {
    const multisig = tonClient.open(Multisig.createFromAddress(address));
    return multisig.getMultisigData();
  } catch (error) {
    console.log("error getMultisigData", error);
  }
};

const DetailMultisig = () => {
  const [data, setData] = useState(null);
  const { id: addressMultisig } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      const endpoint = await getHttpEndpoint();
      const client = new TonClient({
        endpoint,
      });

      // const address = Address.parse(addressMultisig);

      const address = Address.parse(
        "EQCK9nQQaZtak0Gls3U8V8cUhV1UPN-yUL3b_YtEHtdeTcrl"
      );

      console.log("address", address.toString(), client);
      const res = await getMultisigData(address, client);

      console.log("res", res);

      if (res) {
        setData(res);
      }
    })();
  }, [addressMultisig]);

  return (
    <div className={styles.detailPage}>
      <div className={styles.detail}>
        <label>Multisig Address:</label>

        <span>{addressMultisig}</span>
        <Link href={"/"}>Switch to another multisig</Link>
      </div>

      <div className={styles.control}>
        <Link className={styles.back} href={"/"}>
          Back
        </Link>
        <Link className={styles.confirm} href={"/order/create"}>
          Create Order
        </Link>
      </div>
    </div>
  );
};

export default DetailMultisig;

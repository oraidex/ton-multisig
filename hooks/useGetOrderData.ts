"use client";

import { Multisig } from "@oraichain/ton-multiowner/dist/wrappers/Multisig";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Address, TonClient } from "@ton/ton";
import { useEffect, useState } from "react";

export type MultisigDataType = {
  nextOrderSeqno: bigint;
  threshold: bigint;
  signers: Address[];
  proposers: Address[];
};

export const getOrderAddress = async (
  address: Address,
  tonClient: TonClient,
  nextSeq: bigint
) => {
  try {
    const multisig = tonClient.open(Multisig.createFromAddress(address));
    const orderAddress = await multisig.getOrderAddress(nextSeq);
    return orderAddress;
  } catch (error) {
    console.log("error getOrderAddress", error);
  }
};

const useGetOrderData = ({ addressMultisig }: { addressMultisig?: string }) => {
  const [data, setData] = useState<MultisigDataType>(null);

  const getMultisigDetail = async (addressMultisig: string) => {
    try {
      if (!addressMultisig) return;

      const endpoint = await getHttpEndpoint();
      const client = new TonClient({
        endpoint,
      });

      const address = Address.parse(addressMultisig);

      // const address = Address.parse(
      //   "EQCK9nQQaZtak0Gls3U8V8cUhV1UPN-yUL3b_YtEHtdeTcrl"
      // );

      console.log("address", address.toString(), client);
      // const res = await getMultisigData(address, client);

      // console.log("res", res);

      // if (res) {
      //   setData(res);
      //   return res;
      // }
    } catch (error) {
      console.log("error :>> getMultisigDetail", error);
    }
  };

  useEffect(() => {
    getMultisigDetail(addressMultisig);
  }, [addressMultisig]);

  return { data, getMultisigDetail };
};

export default useGetOrderData;

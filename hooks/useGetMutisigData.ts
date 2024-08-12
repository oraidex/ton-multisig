"use client";

import { Multisig } from "@oraichain/ton-multiowner/dist/wrappers/Multisig";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Address, TonClient } from "@ton/ton";
import { useEffect, useState } from "react";
import useHandleMultisigServer, {
  DEFAULT_BE_DATA,
  MultisigSnapshot,
} from "./useHandleMultisigServer";

export type MultisigDataType = {
  nextOrderSeqno: bigint;
  threshold: bigint;
  signers: Address[];
  proposers: Address[];
  data: MultisigSnapshot;
};

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

const useGetMultisigData = ({
  addressMultisig,
}: {
  addressMultisig?: string;
}) => {
  const [data, setData] = useState<MultisigDataType>(null);
  const { getMultisigDetailSnapshot } = useHandleMultisigServer();

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
      const res = await getMultisigData(address, client);
      const multisigOnBE = (await getMultisigDetailSnapshot(
        address.toString()
      )) || { data: DEFAULT_BE_DATA };

      console.log("res", res, multisigOnBE);

      if (res) {
        const data = {
          ...res,
          ...(multisigOnBE?.data ? multisigOnBE : { data: DEFAULT_BE_DATA }),
        };
        setData(data);
        return data;
      }
    } catch (error) {
      console.log("error :>> getMultisigDetail", error);
    }
  };

  useEffect(() => {
    getMultisigDetail(addressMultisig);
  }, [addressMultisig]);

  return { data, getMultisigDetail };
};

export default useGetMultisigData;

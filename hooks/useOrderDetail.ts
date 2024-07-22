"use client";
import { Multisig } from "@oraichain/ton-multiowner/dist/wrappers/Multisig";
import { Order } from "@oraichain/ton-multiowner/dist/wrappers/Order";

import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Address, Cell, TonClient } from "@ton/ton";
import { useCallback, useEffect, useState } from "react";

export type OrderData = {
  inited: boolean;
  multisig: Address;
  order_seqno: bigint;
  threshold: number | null;
  executed: boolean | null;
  signers: Address[];
  approvals: boolean[];
  approvals_num: number | null;
  _approvals: bigint | null;
  expiration_date: bigint | null;
  order: Cell | null;
};

export const getOrderData = async (address: Address, tonClient: TonClient) => {
  try {
    const multisig = tonClient.open(Order.createFromAddress(address));
    return multisig.getOrderData();
  } catch (error) {
    console.log("error getMultisigData", error);
  }
};

const useGetOrderDetail = ({
  addressMultisig,
  seq,
}: {
  addressMultisig?: string;
  seq: bigint;
}) => {
  const [data, setData] = useState<OrderData>({
    inited: false,
    multisig: Address.parse(addressMultisig),
    order_seqno: BigInt(0),
    threshold: null,
    executed: null,
    signers: [],
    approvals: [],
    approvals_num: null,
    _approvals: null,
    expiration_date: null,
    order: null,
  });
  const [orderAddress, setOrderAddress] = useState<string>("");

  const getOrderDetail = useCallback(
    async (addressMultisig: string) => {
      try {
        if (!addressMultisig) return;

        const endpoint = await getHttpEndpoint();
        const client = new TonClient({
          endpoint,
        });

        const address = Address.parse(addressMultisig);
        const multiSig = client.open(Multisig.createFromAddress(address));
        const orderAddress = await multiSig.getOrderAddress(seq);
        const res = await getOrderData(orderAddress, client);

        console.log("res", res);

        if (res) {
          setData(res);
          setOrderAddress(orderAddress.toString());
          return res;
        }
      } catch (error) {
        console.log("error :>> getMultisigDetail", error);
      }
    },
    [seq]
  );

  useEffect(() => {
    getOrderDetail(addressMultisig);
  }, [addressMultisig, getOrderDetail]);

  return { orderAddress, data, getOrderDetail };
};

export default useGetOrderDetail;

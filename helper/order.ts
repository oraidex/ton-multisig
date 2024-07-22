import { OrderType, OrderInput } from "@/components/page/order/constants";
import { TransferRequest } from "@oraichain/ton-multiowner/dist/wrappers/Multisig";
import {
  Address,
  beginCell,
  internal as internal_relaxed,
  MessageRelaxed,
  SendMode,
  toNano,
} from "@ton/core";
import { changeAdminMessage, mintMessage, transferMessage } from "./jetton";
import { JettonMinter } from "@oraichain/ton-bridge-contracts";
import { TonClient } from "@ton/ton";

export const getOrderRequest = async (
  tonClient: TonClient,
  multiSigAddress: Address,
  orderInput: OrderInput,
  responseAddress?: Address
): Promise<TransferRequest> => {
  let message: MessageRelaxed;
  const respAddress = responseAddress || multiSigAddress;

  switch (orderInput.type) {
    case OrderType["Transfer TON"]:
      message = internal_relaxed({
        to: orderInput.toAddress,
        value: toNano(orderInput.amount),
      });
      break;
    case OrderType["Transfer Jetton"]:
      const jettonMinter = tonClient.open(
        JettonMinter.createFromAddress(Address.parse(orderInput.tokenAddress))
      );

      const jettonMultiSigWallet = await jettonMinter.getWalletAddress(
        multiSigAddress
      );
      message = internal_relaxed({
        to: jettonMultiSigWallet,
        value: toNano(0.05),
        bounce: false,
        body: transferMessage(
          BigInt(orderInput.amount),
          Address.parse(orderInput.toAddress),
          respAddress,
          null,
          0n,
          null
        ),
      });
      break;
    case OrderType["Mint Jetton"]:
      message = internal_relaxed({
        to: orderInput.tokenAddress,
        value: toNano(0.05),
        bounce: false,
        body: mintMessage(
          respAddress,
          Address.parse(orderInput.toAddress),
          BigInt(orderInput.amount),
          0n,
          0n
        ),
      });
    case OrderType["Change Jetton Admin"]:
      message = internal_relaxed({
        to: orderInput.tokenAddress,
        value: toNano(0.05),
        bounce: false,
        body: changeAdminMessage(Address.parse(orderInput.toAddress)),
      });
      break;
    default:
      throw new Error("Not supported order type");
  }

  return {
    type: "transfer",
    sendMode: SendMode.PAY_GAS_SEPARATELY,
    message,
  };
};

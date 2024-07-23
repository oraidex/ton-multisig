import { Address, beginCell, Sender, storeStateInit } from "@ton/core";
import { TonConnectUI } from "@tonconnect/ui-react";

export function getSenderFromConnector(
  connector: TonConnectUI,
  address: Address
): Sender {
  return {
    send: async (args) => {
      let initCell = args.init
        ? beginCell().storeWritable(storeStateInit(args.init)).endCell()
        : undefined;
      await connector.sendTransaction({
        validUntil: Date.now() + 5 * 60 * 1000,
        messages: [
          {
            address: args.to.toString({ bounceable: args.bounce }),
            amount: args.value.toString(),
            stateInit: initCell?.toBoc()?.toString("base64"),
            payload: args.body?.toBoc()?.toString("base64"),
          },
        ],
      });
    },
    address,
  };
}

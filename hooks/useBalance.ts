import {
  TON_ADDRESS_CONTRACT,
  TonNetwork,
  TonTokensContract,
} from "@/constants/networks";
import { TonTokenList } from "@/constants/tokens";
import { CW20_DECIMALS, toDisplay } from "@oraichain/oraidex-common";
import { JettonMinter, JettonWallet } from "@oraichain/ton-bridge-contracts";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Address, TonClient } from "@ton/ton";
import { useEffect, useState } from "react";

export const useBalances = ({
  tonWalletAddress,
  tokenAddresses,
}: {
  tonWalletAddress: string;
  tokenAddresses?: string[];
}) => {
  const [balances, setBalances] = useState({});

  const loadBalanceTonTokens = async () => {
    const allTokens =
      tokenAddresses || Object.values(TonTokensContract[TonNetwork.Mainnet]);
    const endpoint = await getHttpEndpoint();
    const client = new TonClient({
      endpoint,
    });

    const fullData = await Promise.all(
      allTokens.map(async (item) => {
        if (item === TON_ADDRESS_CONTRACT) {
          // native token: TON
          const balance = await client.getBalance(
            Address.parse(tonWalletAddress)
          );

          return {
            balance: balance,
            jettonWalletAddress: "",
            token: item,
          };
        }
        const jettonMinter = JettonMinter.createFromAddress(
          Address.parse(item)
        );

        const jettonMinterContract = client.open(jettonMinter);

        const jettonWalletAddress = await jettonMinterContract.getWalletAddress(
          Address.parse(tonWalletAddress)
        );

        const jettonWallet =
          JettonWallet.createFromAddress(jettonWalletAddress);
        const jettonWalletContract = client.open(jettonWallet);
        const balance = await jettonWalletContract.getBalance();

        return {
          balance: balance.amount,
          jettonWalletAddress,
          token: item,
        };
      })
    );

    let amountDetail: AmountDetails = {};
    fullData?.map((data) => {
      const token = TonTokenList(TonNetwork.Mainnet).find(
        (e) => e.contractAddress === data.token
      );

      amountDetail = {
        ...amountDetail,
        // [token.denom]: toDisplay(
        //   data.balance || "0",
        //   token.decimal || CW20_DECIMALS
        // ).toString(),
        [token.denom]: (data.balance || "0").toString(),
      };
    });

    setBalances(amountDetail);
  };

  useEffect(() => {
    try {
      if (tonWalletAddress) {
        loadBalanceTonTokens();
      }
    } catch (error) {
      console.log("error :>> loadAllBalanceTonToken", error);
    }
  }, [tonWalletAddress, tokenAddresses]);

  return {
    balances,
  };
};

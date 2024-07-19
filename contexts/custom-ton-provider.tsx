"use client";

import TonConnect from "@tonconnect/sdk";
import { createContext, useContext, useEffect } from "react";
import { TonConnectStorage } from "./custom-ton-storage";
import { MANIFEST_URL } from "@/constants/config";
import { useLoadTonBalance } from "@/hooks/useLoadToken";
import { isMobile } from "@walletconnect/browser-utils";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import { TonNetwork } from "@/constants/networks";
import { TonClient } from "@ton/ton";

export const CustomTonContext = createContext<{
  connector: TonConnect;
  tonClient: TonClient;
}>({
  connector: new TonConnect({
    manifestUrl: MANIFEST_URL,
    storage: new TonConnectStorage("Ton:root"),
  }),
  tonClient: new TonClient({ endpoint: "https://toncenter.com/api/v2/jsonRPC" }),
});

export const CustomTonProvider = (props: React.PropsWithChildren<{}>) => {
  const tonAddress = useAuthTonAddress();

  const { loadAllBalanceTonToken } = useLoadTonBalance({
    tonAddress,
    tonNetwork: TonNetwork.Mainnet,
  });

  const connector = new TonConnect({
    manifestUrl: MANIFEST_URL,
    storage: new TonConnectStorage("Ton:root"),
  });
  
  const tonClient = new TonClient({ endpoint: "https://toncenter.com/api/v2/jsonRPC" });
  useEffect(() => {
    connector.restoreConnection({
      // openingDeadlineMS: 5 * 3600 * 1000, // timeout to reconnect
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener(
        "ton-connect-connection-restoring-started",
        (event) => {
          console.log("connection-restoring-started", event["detail"]);
        }
      );
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(
          "ton-connect-connection-restoring-started",
          (event) => {
            console.log("connection-restoring-started", event["detail"]);
          }
        );
      }
    };
  }, []);

  return (
    <CustomTonContext.Provider value={{ connector,tonClient }}>
      {props.children}
    </CustomTonContext.Provider>
  );
};

export const useTonConnector = () => {
  const { connector, tonClient} = useContext(CustomTonContext);

  return { connector, tonClient};
};

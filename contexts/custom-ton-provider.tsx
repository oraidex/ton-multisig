"use client";

import { TonNetwork } from "@/constants/networks";
import { useLoadTonBalance } from "@/hooks/useLoadToken";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import { TonClient } from "@ton/ton";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { createContext, useContext } from "react";

export const CustomTonContext = createContext<{
  // connector: TonConnect;
  tonClient: TonClient;
}>({
  // connector: new TonConnect({
  //   manifestUrl: MANIFEST_URL,
  //   storage: new TonConnectStorage("Ton:root"),
  // }),
  tonClient: new TonClient({
    endpoint: "https://toncenter.com/api/v2/jsonRPC",
  }),
});

export const CustomTonProvider = (props: React.PropsWithChildren<{}>) => {
  const tonAddress = useAuthTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const { loadAllBalanceTonToken } = useLoadTonBalance({
    tonAddress,
    tonNetwork: TonNetwork.Mainnet,
  });

  // const connector = new TonConnect({
  //   manifestUrl: MANIFEST_URL,
  //   storage: new TonConnectStorage("Ton:root"),
  // });

  const tonClient = new TonClient({
    endpoint: "https://toncenter.com/api/v2/jsonRPC",
  });
  // useEffect(() => {
  //   console.log(MANIFEST_URL);
  //   connector.restoreConnection({
  //     // openingDeadlineMS: 5 * 3600 * 1000, // timeout to reconnect
  //   });
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener(
  //       "ton-connect-connection-restoring-started",
  //       (event) => {
  //         console.log("connection-restoring-started", event["detail"]);
  //       }
  //     );
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener(
  //         "ton-connect-connection-restoring-started",
  //         (event) => {
  //           console.log("connection-restoring-started", event["detail"]);
  //         }
  //       );
  //     }
  //   };
  // }, []);

  return (
    <CustomTonContext.Provider value={{ tonClient }}>
      {props.children}
    </CustomTonContext.Provider>
  );
};

export const useTonConnector = () => {
  const { tonClient } = useContext(CustomTonContext);

  return { tonClient };
};

"use client";

import { useTonConnector } from "@/contexts/custom-ton-provider";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import {
  useAuthOraiAddress,
  useAuthOraiWallet,
  useAuthTonAddress,
  useAuthTonWallet,
  useAuthenticationActions,
} from "@/stores/authentication/selector";
import {
  OraiWallet,
  TonWallet,
} from "@/stores/authentication/useAuthenticationStore";
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import ConnectedInfo from "../connectedInfo";
import styles from "./index.module.scss";

export type ConnectStatus =
  | "init"
  | "confirming-switch"
  | "confirming-disconnect"
  | "loading"
  | "failed"
  | "success";

const ConnectButton: FC<{ fullWidth?: boolean }> = ({ fullWidth }) => {
  const oraiAddress = useAuthOraiAddress();
  const oraiWallet = useAuthOraiWallet();
  const tonAddress = useAuthTonAddress();
  const tonWallet = useAuthTonWallet();
  const ref = useRef();
  const { connector } = useTonConnector();
  const {
    handleSetOraiAddress,
    handleSetOraiWallet,
    handleSetTonAddress,
    handleSetTonWallet,
  } = useAuthenticationActions();
  const [connectStatus, setConnectStatus] = useState<
    OraiWallet | TonWallet | "init"
  >("init");

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(oraiAddress ? 2 : 1);

  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();
  const { state, open: openConnect, close } = useTonConnectModal();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  useOnClickOutside(ref, () => setOpen(false));

  // const handleConnectWalletInTonNetwork = async (walletType: TonWallet) => {
  //   try {
  //     setConnectStatus(walletType);

  //     const walletsList = await connector.getWallets(); // or use `walletsList` fetched before

  //     const addressConnected = connector.connect({
  //       jsBridgeKey: walletType || "tonkeeper",
  //     });
  //     console.log("addressConnected", connector.account);

  //     return;
  //   } catch (error) {
  //     console.log("error connect", error);
  //   } finally {
  //     setConnectStatus("init");
  //   }
  // };

  const handleDisconnectTon = async (walletType: TonWallet) => {
    try {
      if (tonConnectUI.connected) {
        await tonConnectUI.disconnect();
      }

      if (tonAddress && walletType === tonWallet) {
        handleSetTonAddress({ tonAddress: undefined });
        handleSetTonWallet({ tonWallet: undefined });
      }
    } catch (error) {
      console.log("error disconnect TON :>>", error);
    }
  };

  // useEffect(() => {
  //   connector.onStatusChange(
  //     (wallet) => {
  //       console.log("wallet", wallet);
  //       if (!wallet) {
  //         if (tonAddress) {
  //           handleSetTonAddress({ tonAddress: undefined });
  //           handleSetTonWallet({ tonWallet: undefined });
  //         }
  //         return;
  //       }

  //       const address = toUserFriendlyAddress(
  //         wallet.account?.address,
  //         wallet.account.chain === CHAIN.TESTNET
  //       );
  //       const walletType = wallet?.device?.appName?.toLowerCase() as TonWallet;

  //       handleSetTonAddress({ tonAddress: address });
  //       handleSetTonWallet({ tonWallet: walletType });
  //     },
  //     (err) => {
  //       console.log("error onStatusChange :>>", err);
  //     }
  //   );
  // }, [tonAddress]);

  // useEffect(() => {
  //   if (tonAddress && tonWallet) {
  //     handleConnectWalletInTonNetwork(tonWallet || TonWallet.TonKeeper);
  //   }
  // }, [tonAddress, tonWallet]);

  useEffect(() => {
    if (!(userFriendlyAddress && wallet)) {
      handleSetTonAddress({ tonAddress: undefined });
      handleSetTonWallet({ tonWallet: undefined });
      return;
    }

    console.log("userFriendlyAddress", userFriendlyAddress, wallet);

    handleSetTonAddress({ tonAddress: userFriendlyAddress });
    handleSetTonWallet({
      tonWallet:
        wallet?.["appName"] ||
        (wallet?.device?.appName?.toLowerCase() as TonWallet),
    });
  }, [userFriendlyAddress, wallet]);

  console.log("tonAddress", tonAddress);
  return (
    <div
      className={classNames(styles.wrapperConnect, {
        [styles.fullWidth]: !!fullWidth,
      })}
    >
      {!tonAddress ? (
        <button
          className={styles.buttonConnect}
          onClick={() => {
            openConnect();
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <ConnectedInfo
          onClick={() => handleDisconnectTon(TonWallet.TonKeeper)}
          // onClick={() => setOpen(true)}
        />
      )}
    </div>
  );
};

export default ConnectButton;

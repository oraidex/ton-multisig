"use client";

import { CheckIcon, CopyIcon } from "@/assets/icons/action";
import {
  KeplrIcon,
  MetamaskIcon,
  MyTonWalletIcon,
  OwalletIcon,
  TonKeeperIcon,
} from "@/assets/icons/wallet";
import { reduceString } from "@/libs/utils";
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
import { FC, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

const ConnectedInfo: FC<{ onClick: () => void }> = ({ onClick }) => {
  const oraiAddress = useAuthOraiAddress();
  const oraiWallet = useAuthOraiWallet();
  const tonAddress = useAuthTonAddress();
  const tonWallet = useAuthTonWallet();
  const ref = useRef();
  const {
    handleSetOraiAddress,
    handleSetOraiWallet,
    handleSetTonAddress,
    handleSetTonWallet,
  } = useAuthenticationActions();
  const [copiedValue, setCopiedValue] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false);
        setCopiedValue(null);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isCopied]);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setCopiedValue(text);
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard", error);
        setCopiedValue(null);
      });
  };

  const TonNetworkIcon = mapWalletToIcon[tonWallet];

  return (
    <div className={styles.connectedInfo} onClick={() => onClick()}>
      <div className={styles.item}>
        {TonNetworkIcon && <TonNetworkIcon />}
        {reduceString(tonAddress, 6, 6)}
        {isCopied ? (
          <CheckIcon />
        ) : (
          <CopyIcon
            className={styles.copy}
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(tonAddress);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ConnectedInfo;

const mapWalletToIcon = {
  [OraiWallet.Keplr]: KeplrIcon,
  [OraiWallet.OWallet]: OwalletIcon,
  [OraiWallet.Metamask]: MetamaskIcon,
  [TonWallet.TonKeeper]: TonKeeperIcon,
  [TonWallet.MyTonWallet]: MyTonWalletIcon,
};

"use client";

import Link from "next/link";
import styles from "./index.module.scss";
import { useState } from "react";
import Loader from "@/components/commons/loader/Loader";
import { sleep } from "@/helper";
import useGoBackBrowser from "@/hooks/useGoBackBrowser";
import {
  useGetListMultisig,
  useMultisigActions,
} from "@/stores/multisig/selector";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import {
  address,
  Address,
  beginCell,
  Cell,
  storeStateInit,
  toNano,
} from "@ton/core";
import {
  Multisig,
  MultisigConfig,
  multisigConfigToCell,
} from "@oraichain/ton-multiowner/dist/wrappers/Multisig";
import * as MultisigBuild from "@oraichain/ton-multiowner/dist/build/Multisig.compiled.json";
import { useTonConnector } from "@/contexts/custom-ton-provider";
import { TonClient } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { displayToast, TToastType } from "@/contexts/toasts/Toast";
import NumberFormat from "react-number-format";
import classNames from "classnames";
import {
  AmountLabel,
  FromAddressLabel,
  OrderType,
  StatusEnum,
  ToAddressLabel,
  TokenAddressLabel,
} from "../constants";
import { useParams } from "next/navigation";

const CreateOrder = () => {
  const { handleSetListMultisig } = useMultisigActions();
  const { connector } = useTonConnector();
  const { id: addressMultisig } = useParams<{ id: string }>();

  const listMultisig = useGetListMultisig();
  const tonAddress = useAuthTonAddress();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<{
    orderId: string;
    type: OrderType;
    tokenAddress?: string;
    amount?: number;
    toAddress?: string;
    fromAddress?: string;
    metadataURL?: string;
    status?: StatusEnum;
  }>({
    orderId: "1",
    type: 0,
  });

  return (
    <div className={styles.createOrder}>
      <div className={styles.item}>
        <label>Order ID:</label>
        <br />
        <input
          type="text"
          value={order.orderId}
          placeholder="Order ID . . ."
          onChange={(e) => {
            e.preventDefault();
            setOrder({
              ...order,
              orderId: e.target.value,
            });
          }}
        />
      </div>
      <div className={styles.item}>
        <label>Order Type:</label>
        <br />
        <select
          id="newOrder_typeInput"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value === OrderType["Set status for Jetton Wallet"]) {
              setOrder({
                orderId: "1",
                type: value,
                status: StatusEnum.unlock,
              });

              return;
            }
            setOrder({
              orderId: "1",
              type: value,
            });
          }}
        >
          <option value="0">Transfer TON</option>
          <option value="1">Transfer Jetton</option>
          <option value="2">Mint Jetton</option>
          <option value="3">Change Jetton Admin</option>
          <option value="4">Claim Jetton Admin</option>
          <option value="5">Top-up Jetton Minter</option>
          <option value="6">Change Jetton Metadata URL</option>
          <option value="7">Force Burn Jetton</option>
          <option value="8">Force Transfer Jetton</option>
          <option value="9">Set status for Jetton Wallet</option>
        </select>
      </div>

      <div
        className={classNames(styles.item, {
          [styles.hidden]: !FromAddressLabel[order.type],
        })}
      >
        <label>{FromAddressLabel[order.type]}:</label>
        <br />
        <input
          type="text"
          value={order.fromAddress}
          placeholder={`${FromAddressLabel[order.type]} . . .`}
          onChange={(e) => {
            e.preventDefault();
            setOrder({
              ...order,
              fromAddress: e.target.value,
            });
          }}
        />
      </div>

      <div
        className={classNames(styles.item, {
          [styles.hidden]: !AmountLabel[order.type],
        })}
      >
        <label>{AmountLabel[order.type]}:</label>
        <br />
        <NumberFormat
          placeholder={`${AmountLabel[order.type]} . . .`}
          thousandSeparator
          className={styles.input}
          decimalScale={6}
          type="text"
          value={order.amount}
          onChange={() => {}}
          isAllowed={(values) => {
            const { floatValue } = values;
            // allow !floatValue to let user can clear their input
            return !floatValue || (floatValue >= 0 && floatValue <= 1e14);
          }}
          onValueChange={({ floatValue }) => {
            setOrder({
              ...order,
              amount: floatValue,
            });
          }}
        />
      </div>

      <div
        className={classNames(styles.item, {
          [styles.hidden]: !TokenAddressLabel[order.type],
        })}
      >
        <label>{TokenAddressLabel[order?.type]}:</label>
        <br />
        <input
          type="text"
          value={order.tokenAddress}
          placeholder={`${TokenAddressLabel[order.type]} . . .`}
          onChange={(e) => {
            e.preventDefault();
            setOrder({
              ...order,
              tokenAddress: e.target.value,
            });
          }}
        />
      </div>

      <div
        className={classNames(styles.item, {
          [styles.hidden]: !ToAddressLabel[order.type],
        })}
      >
        <label>{ToAddressLabel[order?.type]}:</label>
        <br />
        <input
          type="text"
          value={order.toAddress}
          placeholder={`${ToAddressLabel[order.type]} . . .`}
          onChange={(e) => {
            e.preventDefault();
            setOrder({
              ...order,
              toAddress: e.target.value,
            });
          }}
        />
      </div>

      <div
        className={classNames(styles.item, {
          [styles.hidden]:
            order.type !== OrderType["Change Jetton Metadata URL"],
        })}
      >
        <label>New Metadata URL:</label>
        <br />
        <input
          type="text"
          value={order.metadataURL}
          placeholder="New Metadata URL . . ."
          onChange={(e) => {
            e.preventDefault();
            setOrder({
              ...order,
              metadataURL: e.target.value,
            });
          }}
        />
      </div>

      <div
        className={classNames(styles.item, {
          [styles.hidden]:
            order.type !== OrderType["Set status for Jetton Wallet"],
        })}
      >
        <label>New Status (unlock, out, in, full):</label>
        <br />
        <select
          id="newOrder_9_newStatus"
          onChange={(e) =>
            setOrder({
              ...order,
              status: e.target.value as StatusEnum,
            })
          }
        >
          <option value="unlock">Unlock</option>
          <option value="out">Outgoing transfers locked</option>
          <option value="in">Inbound transfers locked</option>
          <option value="full">Outgoing and Inbound transfers locked</option>
        </select>
      </div>

      <div className={styles.control}>
        <Link
          className={styles.back}
          href={`/multisig/${addressMultisig}/detail`}
        >
          Back
        </Link>
        <button
          className={styles.confirm}
          onClick={async () => {
            try {
              setLoading(true);
              await sleep(2000);

              // TODO: create order
              console.log("orderData", order);
            } catch (error) {
              console.log("error:>> ", error);

              displayToast(TToastType.TX_FAILED, {
                message:
                  typeof error === "string" ? error : JSON.stringify(error),
              });
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading && <Loader width={22} height={22} />} &nbsp; Create
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;

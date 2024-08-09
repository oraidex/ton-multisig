"use client";

import Loader from "@/components/commons/loader/Loader";
import { useTonConnector } from "@/contexts/custom-ton-provider";
import { displayToast, TToastType } from "@/contexts/toasts/Toast";
import { getSenderFromConnector } from "@/helper";
import { getOrderRequest } from "@/helper/order";
import useGetMultisigData from "@/hooks/useGetMutisigData";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import Editor from "@monaco-editor/react";
import {
  Multisig,
  MultisigConfig,
  TransferRequest,
} from "@oraichain/ton-multiowner/dist/wrappers/Multisig";
import { Address, toNano } from "@ton/core";
import classNames from "classnames";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import NumberFormat from "react-number-format";
import {
  AmountLabel,
  CustomMsg,
  FromAddressLabel,
  JETTON_MINTER_DEFAULT,
  OrderInput,
  OrderType,
  StatusEnum,
  ToAddressLabel,
  TokenAddressLabel,
} from "../constants";
import styles from "./index.module.scss";
import { useTonConnectUI } from "@tonconnect/ui-react";

const CreateOrder = () => {
  const { tonClient } = useTonConnector();
  const [tonConnectUI] = useTonConnectUI();
  const { id: addressMultisig } = useParams<{ id: string }>();
  const { data } = useGetMultisigData({ addressMultisig });
  const [loading, setLoading] = useState(false);
  const tonAddress = useAuthTonAddress();

  const [order, setOrder] = useState<OrderInput>({
    type: 0,
  });

  const onCreate = async () => {
    try {
      console.log("orderData", order);
      setLoading(true);
      const multiSigConfig: MultisigConfig = {
        threshold: Number(data.threshold),
        signers: data.signers,
        proposers: data.proposers,
        allowArbitrarySeqno: false,
      };
      const multisig = new Multisig(
        Address.parse(addressMultisig),
        undefined,
        multiSigConfig
      );
      const multiSigContract = tonClient.open(multisig);
      const expirationDate = Math.floor(Date.now() / 1000) + 60 * 1000;
      const sender = getSenderFromConnector(
        tonConnectUI,
        Address.parse(tonAddress)
      );
      console.log(order.amount);
      const request: TransferRequest = await getOrderRequest(
        tonClient,
        Address.parse(addressMultisig),
        order,
        sender?.address
      );
      await multiSigContract.sendNewOrder(
        sender,
        [request],
        expirationDate,
        toNano(0.1)
      );
    } catch (error) {
      console.log("error:>> ", error);
      displayToast(TToastType.TX_FAILED, {
        message: typeof error === "string" ? error : JSON.stringify(error),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.createOrder}>
      <div className={styles.item}>
        <label>Order ID:</label>
        <br />
        <input
          type="text"
          value={data?.nextOrderSeqno.toString()}
          disabled={true}
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
                type: value,
                status: StatusEnum.unlock,
              });
              return;
            }
            if (
              [OrderType["Transfer Jetton"], OrderType["Mint Jetton"]].includes(
                value
              )
            ) {
              setOrder({
                type: value,
                supportToken: JETTON_MINTER_DEFAULT.jUSDT,
                tokenAddress: JETTON_MINTER_DEFAULT.jUSDT,
              });
              return;
            }
            setOrder({
              type: value,
            });
          }}
        >
          <option value="0">Transfer TON</option>
          <option value="1">Transfer Jetton</option>
          <option value="2">Mint Jetton</option>
          <option value="3">Change Jetton Admin</option>
          <option value="4">Custom Order</option>
          {/* TODO: Add this option later */}
          {/* <option value="4">Claim Jetton Admin</option>
          <option value="5">Top-up Jetton Minter</option>
          <option value="6">Change Jetton Metadata URL</option>
          <option value="7">Force Burn Jetton</option>
          <option value="8">Force Transfer Jetton</option>
          <option value="9">Set status for Jetton Wallet</option>
          <option value="10">Custom order</option> 
          */}
        </select>
      </div>
      <div
        className={classNames(styles.item, {
          [styles.hidden]: ![
            OrderType["Transfer Jetton"],
            OrderType["Mint Jetton"],
          ].includes(order.type),
        })}
      >
        <label>Jetton Token:</label>
        <br />
        <select
          id="jettonToken_typeInput"
          onChange={(e) => {
            const value = e.target.value;

            setOrder({
              ...order,
              supportToken: value,
              tokenAddress: value,
            });
          }}
        >
          <option value={JETTON_MINTER_DEFAULT.jUSDT}>jUSDT</option>
          <option value={JETTON_MINTER_DEFAULT.jUSDC}>jUSDC</option>
          <option value={JETTON_MINTER_DEFAULT.USDT}>USD₮</option>
          <option value={JETTON_MINTER_DEFAULT.CUSTOM}>Custom Jetton</option>
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
          [styles.hidden]:
            (TokenAddressLabel[order.type] && order.supportToken) || // !ton, supportToken = true
            !TokenAddressLabel[order.type], // = ton
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
            console.log("first", floatValue);
            setOrder({
              ...order,
              amount: floatValue,
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
          [styles.hidden]: order.type !== OrderType["Custom order"],
        })}
      >
        <label>Custom Order Messages:</label>
        <br />
        <div className={styles.editor}>
          <Editor
            theme="vs-dark"
            height="300px"
            defaultLanguage="json"
            options={{
              fontSize: 14,
              wordWrap: "on",
            }}
            defaultValue={`{"boc":""}`}
            onChange={(value) => {
              try {
                const customMsg = JSON.parse(value) as CustomMsg;
                setOrder({
                  ...order,
                  customMsg: customMsg,
                });
              } catch (error) {
                console.log("error: >> editor custom msg", error);
              }
            }}
          />
        </div>
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
        <button className={styles.confirm} onClick={onCreate}>
          {loading && <Loader width={22} height={22} />} &nbsp; Create
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;

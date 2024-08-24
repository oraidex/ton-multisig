"use client";
import useGetMultisigData from "@/hooks/useGetMutisigData";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./index.module.scss";
import { useAuthTonAddress } from "@/stores/authentication/selector";
import { useBalances } from "@/hooks/useBalance";
import { block } from "sharp";
import {
  DEFAULT_BE_DATA,
  parseJsonDataFromSqlite,
} from "@/hooks/useHandleMultisigServer";
import { Address, fromNano, toNano } from "@ton/core";
import useGetOrderDetail from "@/hooks/useOrderDetail";
import { cellToArray, getSenderFromConnector } from "@/helper";
import { Order } from "@oraichain/ton-multiowner/dist/wrappers/Order";
import { useTonConnector } from "@/contexts/custom-ton-provider";
import { useTonConnectUI } from "@tonconnect/ui-react";

const parseAddress = (address: string) => Address.parse(address);
const DetailOrder = () => {
  const tonAddress = useAuthTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const { id: addressMultisig, orderId } = useParams<{
    id: string;
    orderId: string;
  }>();
  const { data: orderDetail, orderAddress } = useGetOrderDetail({
    addressMultisig,
    seq: BigInt(orderId),
  });
  const { data } = useGetMultisigData({ addressMultisig });
  const { threshold, signers, proposers, nextOrderSeqno } = data || {};
  const { balances } = useBalances({
    tonWalletAddress: orderAddress?.toString() || "",
  });
  const { data: dataBE = DEFAULT_BE_DATA } = data || {};

  const { tonClient } = useTonConnector();

  const handleSignMultisig = async () => {
    try {
      const signerIndex = signers.findIndex((signer) => {
        return Address.parse(tonAddress).equals(signer);
      });
      const order = Order.createFromAddress(Address.parse(orderAddress));
      const orderContract = tonClient.open(order);
      const sender = getSenderFromConnector(
        tonConnectUI,
        Address.parse(tonAddress)
      );
      await orderContract.sendApprove(sender, signerIndex, toNano("0.01"));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.detailPage}>
      <div className={styles.detail}>
        <label>Order ID:</label>
        <span className={styles.address}>#{orderId}</span>

        <label>Order Address:</label>
        <Link
          href={`https://tonviewer.com/${orderAddress}`}
          target="blank"
          className={styles.address}
        >
          {orderAddress}
        </Link>

        <label>TON Balance: </label>

        <span>{fromNano(balances?.["ton"] || 0)} TON</span>

        <label>Executed:</label>

        <span>{orderDetail.executed ? "True" : "False"}</span>

        <label>Approvals:</label>
        <span>
          {Number(orderDetail.approvals_num || 0)}/
          {Number(orderDetail.threshold)}
        </span>
        <label>Signers:</label>
        <div className={styles.list}>
          {(orderDetail.signers || []).map((e, index) => {
            const signersBE = parseJsonDataFromSqlite(dataBE.signers);
            const currentSigner = signersBE?.find(
              (s: any) => s.value === e.toString()
            );
            return (
              <div className={styles.item} key={index}>
                <span className={styles.id}>#{index + 1} - </span>
                <span className={styles.address}>
                  {e.toString()}
                  <span className={styles.nameSuffix}>
                    {`${currentSigner ? ` (${currentSigner.name})` : ""}`}
                  </span>
                </span>
                {tonAddress &&
                  parseAddress(e.toString()).equals(
                    parseAddress(tonAddress)
                  ) && <span className={styles.badge}> It&apos;s You</span>}
              </div>
            );
          })}
        </div>

        <label>Proposers:</label>
        <div className={styles.list}>
          {!(proposers || []).length ? (
            <span>No Proposers</span>
          ) : (
            proposers.map((e, index) => {
              const proposersBE = parseJsonDataFromSqlite(dataBE.proposers);
              const currentProposer = proposersBE?.find(
                (p: any) => p.value === e.toString()
              );
              return (
                <div className={styles.item} key={index}>
                  <span className={styles.id}>#1</span>
                  <span className={styles.address}>
                    {addressMultisig}
                    <span className={styles.nameSuffix}>
                      {`${currentProposer ? ` (${currentProposer.name})` : ""}`}
                    </span>
                  </span>
                  {tonAddress &&
                    parseAddress(e.toString()).equals(
                      parseAddress(tonAddress)
                    ) && <span className={styles.badge}> It&apos;s You</span>}
                </div>
              );
            })
          )}
        </div>

        <label>Expires At:</label>
        <span>
          {orderDetail?.expiration_date
            ? new Date(
                Number(orderDetail.expiration_date.toString()) * 1000
              ).toString()
            : ""}
        </span>

        <br />
        <br />

        <label>Actions:</label>
        <div className={styles.list}>
          <div></div>
          {
            /* {[orderDetail.order].map((e, idx) => {
            return (
              <>
                <label>Actions #{idx}:</label>
                <br />
                <span>abc</span>
              </>
            );
          })} */
            orderDetail?.order?.asSlice()?.remainingRefs > 0 &&
              cellToArray(orderDetail?.order)?.map((e, idx) => {
                const eCs = e.asSlice();
                const messages = eCs.loadRef().toBoc().toString("hex");
                const actionType = eCs.loadUint(32).toString(16);
                return (
                  <>
                    <p>
                      Actions #{idx + 1}: {`0x${actionType}`}{" "}
                    </p>
                    <div style={{ wordBreak: "break-all" }}>
                      Raw messages: {messages}
                    </div>
                  </>
                );
              })
          }
        </div>

        <div className={styles.control}>
          <Link
            className={styles.back}
            href={`/multisig/${addressMultisig}/detail`}
          >
            Back
          </Link>
          <div className={styles.confirm} onClick={handleSignMultisig}>
            Sign
          </div>
        </div>

        <br />
      </div>
    </div>
  );
};

export default DetailOrder;

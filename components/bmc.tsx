'use client';

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useState } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useContractEvents,
  useReadContract,
} from "thirdweb/react";
import { contract } from "../utils/contract";

export const BMC = () => {
  const account = useActiveAccount();
  const [buyAmount, setBuyAmount] = useState(0);
  const [message, setMessage] = useState("");

  const {
    data: totalCoffees,
    refetch: refetchTotalCoffees,
  } = useReadContract({
    contract: contract,
    method: "getTotal",
  });

  const {
    data: contractEvents,
    refetch: refetchContractEvents,
  } = useContractEvents({
    contract: contract,
  });

  const truncateWalletAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const convertDate = (timestamp: bigint) => {
    const timestampNumber = Number(timestamp);
    return new Date(timestampNumber * 1000).toLocaleString();
  };

  if (account) {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "500px",
          margin: "2rem auto",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <ConnectButton client={client} chain={chain} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            Tip Amount
          </label>
          <p style={{ fontSize: "0.9rem", color: "#888", marginBottom: "1rem" }}>
            *greater than 0 ser.
          </p>
          <input
            type="number"
            value={buyAmount}
            onChange={(e) => setBuyAmount(Number(e.target.value))}
            step={0.01}
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          />
          <label style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            Message
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message..."
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          />
          {message && buyAmount > 0 && (
            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract: contract,
                  method: "bmc",
                  params: [message],
                  value: BigInt(toWei(buyAmount.toString())),
                })
              }
              onTransactionConfirmed={() => {
                alert("Thank you for the coffee!");
                setBuyAmount(0);
                setMessage("");
                refetchTotalCoffees();
                refetchContractEvents();
              }}
          
            >
              Buy Coffee
            </TransactionButton>
          )}
        </div>
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
            Total Coffees: {totalCoffees?.toString()}
          </h3>
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            Recent Coffees:
          </p>
          {contractEvents &&
            contractEvents.length > 0 &&
            [...contractEvents].reverse().map((event, index) => (
              <div
                key={index}
                style={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <p style={{ fontSize: "0.9rem", color: "#555" }}>
                    {/* @ts-ignore */}
                    {truncateWalletAddress(event.args.sender)}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#555" }}>
                    {/* @ts-ignore */}
                    {convertDate(event.args.timestamp)}
                  </p>
                </div>
                <p style={{ fontSize: "1rem", color: "#333" }}>
                  {/* @ts-ignore */}
                  {event.args.message}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  }
};

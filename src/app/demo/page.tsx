// src/app/demo/page.tsx
"use client";
import DecentralizedCoffeeCreatorPage from "../../../components/demo";

export default function demo() {
  return <DecentralizedCoffeeCreatorPage 
    initialName="Web3 Creator"
    initialDescription="Building the future of decentralized content"
    initialWalletAddress="0x1234..." 
  />;
}
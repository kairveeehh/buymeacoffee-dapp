import { client } from "@/app/client";
import {chain} from "@/app/chain";
import { getContract } from "thirdweb";
import { contractABI } from "./contractABI";

const contractAddress = "0x148383C639671B317e29fA9DA82E1aCa4352b41e";
 export const contract = getContract({
  client: client ,
  address: contractAddress,
  chain: chain,
  abi: contractABI,
 });
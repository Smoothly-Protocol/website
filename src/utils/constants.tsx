import { Contract, Signer, utils } from "ethers";
import { artifact } from './artifact';

export const contractAddress = "0x894F0786cb41b1c1760E70d61cB2952749Da6382";
export const STAKE_FEE = utils.parseEther("0.065");
export const MISS_FEE = utils.parseEther("0.015");

export function useContract(signer: Signer): Contract {
  try {
    return new Contract(contractAddress, artifact['abi'], signer);
  } catch(err) {
    console.log(err);
  }  
}


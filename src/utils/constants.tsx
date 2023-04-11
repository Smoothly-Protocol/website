import { Contract, Signer, utils } from "ethers";
import { artifact } from './artifact';

export const contractAddress = "0x60A1AB8dc936cFbc3DfF4D4Ca24277375adb9ab4";
export const STAKE_FEE = utils.parseEther("0.065");
export const MISS_FEE = utils.parseEther("0.015");

export function useContract(signer: Signer): Contract {
  try {
    return new Contract(contractAddress, artifact['abi'], signer);
  } catch(err) {
    console.log(err);
  }  
}


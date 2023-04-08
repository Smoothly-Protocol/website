import { Contract, Signer, utils } from "ethers";
import { artifact } from './artifact';

export const contractAddress = "0x22f635b0B45010C087612B6700f660b047C17A7d";
export const STAKE_FEE = utils.parseEther("0.65");
export const MISS_FEE = utils.parseEther("0.15");

export function useContract(signer: Signer): Contract {
  try {
    return new Contract(contractAddress, artifact['abi'], signer);
  } catch(err) {
    console.log(err);
  }  
}


import { Contract, Signer, utils } from "ethers";
import { artifact } from './artifact';

export const contractAddress = "0x2bE68B8Fd9E7941378CA81dF120F2F7eBb7c0Cf6";
export const STAKE_FEE = utils.parseEther("0.065");
export const MISS_FEE = utils.parseEther("0.015");

export function useContract(signer: Signer): Contract {
  try {
    return new Contract(contractAddress, artifact['abi'], signer);
  } catch(err) {
    console.log(err);
  }  
}


import { Contract, Signer } from "ethers";

export const contractAddress = "0x8d3b2dc0c22a2bdc17975c065a65637bd9d58f6b";
const abi = [
  "function registerBulk(bytes[] memory pubKeys) external payable",
  "function withdrawRewards(uint[] memory validator_ids) public",
  "function getValidators() external view returns(tuple(bytes,uint256,uint256,uint256,uint256,bool)[])",
  "function exit(uint[] memory validator_ids) external",
  "function getRebalanceRewards() external view returns(uint)",
  "function totalStake() external view returns(uint)",
  "function totalRewards() external view returns(uint)",
  "function addStake(uint id) external payable"
];

export function useContract(signer: Signer): Contract {
  try {
    return new Contract(contractAddress, abi, signer);
  } catch(err) {
    console.log(err);
  }  
}


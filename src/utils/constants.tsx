import { Contract, Signer } from "ethers";

const contractAddress = "0x57d4b219a5076d814d2dfefa87b3c382d05a4d43";
const abi = [
  "function registerBulk(bytes[] memory pubKeys) external payable",
  "function withdrawRewards(uint[] memory validator_ids) public",
  "function getValidators() external view returns(tuple(bytes,uint256,uint256,uint256)[])",
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


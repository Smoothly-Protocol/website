import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

interface Response {
  proof: Array<any>;
}

export async function getProofArgs(eth1Addr: string, _tree: string): Promise<Response> {
  try {
    const response = await fetch(`https://node-goerli.smoothly.money/tree/${_tree}/${eth1Addr}`);
    const data = await response.json();
		return data;
  } catch(err: any) {
    console.log(err);
  }
}

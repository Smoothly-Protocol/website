import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

export async function getProofArgs(eth1Addr: string, _tree: string): Promise<Array<any>> {
  try {
    const response = await fetch(`node-goerli.smoothly.money/tree/${_tree}`);
    const data = await response.json();
		const tree = StandardMerkleTree.load(data);   
		for (const [i, v] of tree.entries()) {
			if (v[0] === eth1Addr.toLowerCase()) {
				return [tree.getProof(i), v[1], v[2]];
			}
		}
		return [];
  } catch(err: any) {
    console.log(err);
  }
}

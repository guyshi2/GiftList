const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');


const serverUrl = 'http://localhost:1225';

async function main() {
  // Create a Merkle tree for the nice list
  const merkleTree = new MerkleTree(niceList);

  // Find the index of our name in the nice list
  const name = 'Your Name';
  const index = niceList.findIndex(n => n === name);

  if (index === -1) {
    console.log(`${name} is not on the nice list`);
    return;
  }

  // Get the proof for our name from the Merkle tree
  const proof = merkleTree.getProof(index);

  // Send the leaf node, its index, and its proof to the server
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    leaf: name,
    index,
    proof,
  });

  console.log({ gift });
}

main();
const express = require('express');
const verifyProof = require('../utils/verifyProof');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { hexToBytes } = require('ethereum-cryptography/utils');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '...';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof } = req.body;

  // TODO: prove that a name is in the list 
  proof = proof.map(({ data, left }) => ({ 
    left, data: hexToBytes(data)
  }));
  const data = keccak256(Buffer.from(name));
  const isInTheList = verifyProof(proof, data, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

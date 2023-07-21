// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const IDENTITY = "appUser";
const CHANNEL = "mychannel1";
const CHAINCODE = "coffeecontract";
const path = require("path");

async function connectNetwork(smartContract) {
  //const walletPath = path.join(process.cwd(), walletOrg);
  const walletPath = path.join(process.cwd(), "src/wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);
  const ccpPath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "network",
    "organizations",
    "peerOrganizations",
    "orgyccu.adey-meselesh.de",
    "connection-orgyccu.json"
  );
  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

  // Check to see if we've already enrolled the user.
  const identity = await wallet.get("appUser");
  if (!identity) {
    console.log(
      'An identity for the user "appUser" does not exist in the wallet'
    );
    console.log("Run the registerUser.js application before retrying");
    return;
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: IDENTITY,
    discovery: {
      enabled: true,
      asLocalhost: true,
    },
  });
  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork(CHANNEL);
  // Get the contract from the network.
  //const contract = network.getContract(CONTRACT);
  const contract = network.getContract(CHAINCODE, smartContract);
  return contract;
}

module.exports = { connectNetwork };

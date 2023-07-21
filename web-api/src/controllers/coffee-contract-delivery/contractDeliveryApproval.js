const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");
const contractDeliveryApproval = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeAgreementDeliveryContract"
    );

    let tx = await contract.submitTransaction(
      "contractDeliveryApproval",
      req.body.id,
      req.body.contractId

    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid:  req.body.id,
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};
module.exports = contractDeliveryApproval;

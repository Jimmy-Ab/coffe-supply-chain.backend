const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");
const contractDeliveryRejection = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "CoffeeAgreementDeliveryContract"
    );

    let tx = await contract.submitTransaction(
      "contractDeliveryRejection",
      req.body.contractId,
      req.body.id

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
module.exports = contractDeliveryRejection;

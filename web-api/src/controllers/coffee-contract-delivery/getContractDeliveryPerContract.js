const fabricNetwork = require("../../fabricNetwork");

const getContractDeliveryPerContract = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-retailer.json",
      "wallet/wallet-retailer",
      "CoffeeAgreementDeliveryContract"
    );
    const result = await contract.evaluateTransaction(
      "getContractDeliveryPerContract",
      req.params.contractId.toString()
    );
    let response = JSON.parse(result.toString());
    res.json({ result: response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = getContractDeliveryPerContract;

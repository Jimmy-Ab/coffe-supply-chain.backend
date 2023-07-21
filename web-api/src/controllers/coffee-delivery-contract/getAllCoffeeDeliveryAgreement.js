const fabricNetwork = require("../../fabricNetwork");

const getAllCoffeeDeliveryAgreement = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-retailer.json",
      "wallet/wallet-retailer",
      "CoffeeAgreementRegulatorContract"
    );
    const result = await contract.evaluateTransaction(
      "getAllCoffeeDeliveryAgreement"
    );
    let response = JSON.parse(result.toString());
    res.json({ response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
}; 

module.exports = getAllCoffeeDeliveryAgreement;

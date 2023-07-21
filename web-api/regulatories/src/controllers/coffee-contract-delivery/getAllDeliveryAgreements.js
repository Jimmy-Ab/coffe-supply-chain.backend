const fabricNetwork = require("../../fabricNetwork");

const getAllDeliveryAgreements = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(

      "CoffeeAgreementDeliveryContract"
    );
    const result = await contract.evaluateTransaction(
      "getAllDeliveryAgreements"
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

module.exports = getAllDeliveryAgreements;

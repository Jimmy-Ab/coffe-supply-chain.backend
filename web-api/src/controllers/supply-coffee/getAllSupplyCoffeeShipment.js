const fabricNetwork = require("../../fabricNetwork");

const getAllSupplyCoffeeShipment = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-retailer.json",
      "wallet/wallet-retailer",
      "SupplyCoffeeCoffeeSupplierContract"
    );
    const result = await contract.evaluateTransaction(
      "getAllSupplyCoffeeShipment"
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

module.exports = getAllSupplyCoffeeShipment;

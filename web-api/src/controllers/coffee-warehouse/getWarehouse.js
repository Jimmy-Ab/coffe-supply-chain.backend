const fabricNetwork = require("../../fabricNetwork");

const getWarehouse = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-retailer.json",
      "wallet/wallet-retailer",
      "CoffeeWarehouseContract"
    );
    const result = await contract.evaluateTransaction(
      "getWarehouse",
      req.params.id.toString()
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

module.exports = getWarehouse;

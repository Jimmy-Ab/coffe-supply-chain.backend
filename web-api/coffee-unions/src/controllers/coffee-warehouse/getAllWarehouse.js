const fabricNetwork = require("../../fabricNetwork");

const getAllWarehouse = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "CoffeeWarehouseContract"
    );
    const result = await contract.evaluateTransaction("getAllWarehouse");
    let response = JSON.parse(result.toString());
    res.json({ response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = getAllWarehouse;

const fabricNetwork = require("../../fabricNetwork");

const updateWarehouse = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeWarehouseContract"
    );
    let tx = await contract.submitTransaction(
      "updateWarehouse",
      req.body.id,
      req.body.warehouseNo,
      req.body.name,
      req.body.address,
      req.body.size,
      req.body.capacity,
      req.body.owner,
      req.body.latitude,
      req.body.longitude
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: req.body.id.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = updateWarehouse;

const fabricNetwork = require("../../fabricNetwork");

const addDelivery = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeGrowerContract"
    );
    let tx = await contract.submitTransaction(
      "addDelivery",
      req.body.id,
      req.body.deliveryId,
      req.body.batchNumber,
      req.body.quantity,
      req.body.unitOfMeasure,
      req.body.deliveredDate,
      req.body.sellingPrice
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: tx.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = addDelivery;

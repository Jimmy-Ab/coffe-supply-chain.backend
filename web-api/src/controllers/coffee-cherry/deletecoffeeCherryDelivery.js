const fabricNetwork = require("../../fabricNetwork");

const deletecoffeeCherryDelivery = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeCherryGrowerContract"
    );
    const deliveredTo = req.params.deliveredTo;
    const batchNumber = req.params.batchNumber;
    const deliveryId = req.params.deliveryId;
    let tx = await contract.submitTransaction(
      "deletecoffeeCherryDelivery",
      deliveredTo,
      batchNumber,
      deliveryId
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

module.exports = deletecoffeeCherryDelivery;

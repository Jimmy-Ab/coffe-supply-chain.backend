const fabricNetwork = require("../../fabricNetwork");

const qualityInspection = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeCherryRegionalOrganContract"
    );
    let tx = await contract.submitTransaction(
      "qualityInspection",
      req.body.deliveredTo,
      req.body.batchNumber,
      req.body.deliveryId,
      req.body.quality
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

module.exports = qualityInspection;

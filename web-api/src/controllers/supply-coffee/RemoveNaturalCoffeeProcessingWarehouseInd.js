const fabricNetwork = require("../../fabricNetwork");

const RemoveNaturalCoffeeProcessingWarehouseInd = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "SupplyCoffeeRegionalOrganContract"
    );
    const id = req.params.id;
    let tx = await contract.submitTransaction("RemoveNaturalCoffeeProcessingWarehouseInd", id);
    res.json({
      status: "OK - Transaction has been submitted",
      txid: id.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = RemoveNaturalCoffeeProcessingWarehouseInd;

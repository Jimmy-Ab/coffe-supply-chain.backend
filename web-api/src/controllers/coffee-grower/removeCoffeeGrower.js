const fabricNetwork = require("../../fabricNetwork");

const removeCoffeeGrower = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeGrowerContract"
    );
    const id = req.params.id;
    let tx = await contract.submitTransaction("removeCoffeeGrower", id);
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

module.exports = removeCoffeeGrower;

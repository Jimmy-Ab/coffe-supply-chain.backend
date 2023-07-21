const fabricNetwork = require("../../fabricNetwork");

const deleteCoffeeDailyPrice = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeDailyPriceContract"
    );
    const date = req.params.date;
    const id = req.params.id;
    let tx = await contract.submitTransaction(
      "deleteCoffeeDailyPrice",
      date,
      id
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

module.exports = deleteCoffeeDailyPrice;

const fabricNetwork = require("../../fabricNetwork");

const returnShipment = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "SupplyCoffeeCoffeeSupplierContract"
    );
    let tx = await contract.submitTransaction(
      "returnShipment",
      req.body.id,
      req.body.returnDate,
      req.body.recievedBy
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

module.exports = returnShipment;

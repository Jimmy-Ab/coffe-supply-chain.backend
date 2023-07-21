const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");

const produceWashedSupplyCoffee = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "SupplyCoffeeCoffeeSupplierContract"
    );
    const id = getId();
    let tx = await contract.submitTransaction(
      "produceWashedSupplyCoffee",
      id,
      req.body.quantity,
      req.body.bagSize,
      req.body.owner,
      req.body.coffeeCherryBatchNo,
      req.body.measurmentUnit,
      req.body.naturalCoffeeProductionPlace
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: "BNO_N_" + id.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = produceWashedSupplyCoffee;

const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");

const produceNaturalCoffee = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "SupplyCoffeeCoffeeSupplierContract"
    );
    const id = getId();
    let tx = await contract.submitTransaction(
      "produceNaturalCoffee",
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
      txid: "BNO_N_" + id,
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = produceNaturalCoffee;

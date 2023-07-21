const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");

const produceExportCoffee = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "ExportCoffeeExporterContract"
    );
    const _id = getId();
    let tx = await contract.submitTransaction(
      "produceExportCoffee",
      _id,
      req.body.quantity,
      req.body.bagSize,
      req.body.supplyCoffeeBatchNumber,
      req.body.unit,
      req.body.productionPlace,
      req.body.owner
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: "BNO_N_" + _id,
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = produceExportCoffee;

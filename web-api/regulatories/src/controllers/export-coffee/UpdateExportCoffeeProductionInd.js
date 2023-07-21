const fabricNetwork = require("../../fabricNetwork");

const UpdateExportCoffeeProductionInd = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "ExportCoffeeRegulatorContract"
    );
    let tx = await contract.submitTransaction(
      "UpdateExportCoffeeProductionInd",
      req.body.id,
      req.body.name,
      req.body.machineSpec,
      req.body.owner,
      req.body.address,
      req.body.size,
      req.body.warehouseSize,
      req.body.hasAirConditioner,
      req.body.hasPreCleaner,
      req.body.hasPneumaticAspirate,
      req.body.hasDensmetricSeparator,
      req.body.hasScreanGrading,
      req.body.hasColorSorter,
      req.body.latitude,
      req.body.longitude
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

module.exports = UpdateExportCoffeeProductionInd;

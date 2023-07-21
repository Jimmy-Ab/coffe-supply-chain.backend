const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");

const registerExportCoffeeProductionInd = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "ExportCoffeeRegulatorContract"
    );
    const _id = getId();
    let tx = await contract.submitTransaction(
      "registerExportCoffeeProductionInd",
      _id,
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
      /*  req.body.date,
            req.body.transporter,
            req.body.truck, */
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: _id.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = registerExportCoffeeProductionInd;

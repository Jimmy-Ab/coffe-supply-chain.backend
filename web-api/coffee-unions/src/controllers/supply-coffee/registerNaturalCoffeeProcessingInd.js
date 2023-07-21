const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");

const registerNaturalCoffeeProcessingWarehouseInd = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
        "SupplyCoffeeRegionalOrganContract"
    );
    const _id = getId();
    let tx = await contract.submitTransaction(
      "registerNaturalCoffeeProcessingWarehouseInd",
      _id,
      req.body.name,
      req.body.owner,
      req.body.address,
      req.body.size,
      req.body.machineSpec,
      req.body.dringAreaSize,
      req.body.warehouseSize,
      req.body.hasWeightingScale,
      req.body.hasMoistureCalibrator,
      req.body.latitude,
      req.body.longitude
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

module.exports = registerNaturalCoffeeProcessingWarehouseInd;

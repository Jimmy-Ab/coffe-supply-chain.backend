const fabricNetwork = require("../../fabricNetwork");

const getExportCoffeeProductionInd = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "ExportCoffeeRegulatorContract"
    );
    const result = await contract.evaluateTransaction(
      "getExportCoffeeProductionInd",
      req.params.owner.toString(),
      req.params.id.toString(),
    );
    let response = JSON.parse(result.toString());
    res.json({ result: response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = getExportCoffeeProductionInd;

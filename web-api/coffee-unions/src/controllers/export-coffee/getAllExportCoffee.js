const fabricNetwork = require("../../fabricNetwork");

const getAllExportCoffee = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "ExportCoffeeExporterContract"
    );
    const result = await contract.evaluateTransaction("getAllExportCoffee");
    let response = JSON.parse(result.toString());
    res.json({ response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = getAllExportCoffee;

const fabricNetwork = require("../../fabricNetwork");

const coffeeGrading = async (req, res, next) =>
{
  try
  {
    const contract = await fabricNetwork.connectNetwork(
      "ExportCoffeeExporterContract"
    );
    let tx = await contract.submitTransaction(
      "coffeeGrading",
      req.body.owner,
      req.body.batchNumber,
      req.body.grade
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: tx.toString(),
    });
  } catch (error)
  {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = coffeeGrading;

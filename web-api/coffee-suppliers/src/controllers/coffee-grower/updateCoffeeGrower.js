const fabricNetwork = require("../../fabricNetwork");

const updateCoffeeGrower = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork("CoffeeGrowerContract");
    let tx = await contract.submitTransaction(
      "updateCoffeeGrower",
      req.body.id,
      req.body.nationalityId,
      req.body.fullName,
      req.body.gender,
      req.body.farmPlace,
      req.body.farmSize,
      req.body.maritalStatus,
      req.body.dateOfBirth,
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

module.exports = updateCoffeeGrower;

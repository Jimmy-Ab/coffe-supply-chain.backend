const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");
const registerCoffeeGrower = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "CoffeeGrowerContract"
    );
    const _farmerId = getId();
    let tx = await contract.submitTransaction(
      "registerCoffeeGrower",
      _farmerId,
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
      txid: _farmerId.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};
module.exports = registerCoffeeGrower;

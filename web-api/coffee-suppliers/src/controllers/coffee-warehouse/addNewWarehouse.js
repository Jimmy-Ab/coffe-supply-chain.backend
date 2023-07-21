const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");

const addNewWarehouse = async (req, res, next) =>
{
  try
  {
    const contract = await fabricNetwork.connectNetwork(
      "CoffeeWarehouseContract"
    );
    const _warehouseId = getId();
    let tx = await contract.submitTransaction(
      "addNewWarehouse",
      _warehouseId,
      req.body.warehouseNo,
      req.body.name,
      req.body.address,
      req.body.size,
      req.body.capacity,
      req.body.owner,
      req.body.latitude,
      req.body.longitude
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: _warehouseId.toString(),
    });
  } catch (error)
  {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = addNewWarehouse;

const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");

const coffeeCherryDelivery = async (req, res, next) =>
{
  try
  {
    const contract = await fabricNetwork.connectNetwork(
      "CoffeeCherryGrowerContract"
    );
    const _deliveryId = `DI_${getId()}`;
    let tx = await contract.submitTransaction(
      "coffeeCherryDelivery",
      _deliveryId,
      req.body.batchNumber,
      req.body.quantity,
      req.body.unitOfMeasure,
      req.body.farmPlace,
      req.body.coffeegrower,
      req.body.collectionDate,
      req.body.sellingPrice,
      req.body.currency,
      req.body.warehouseId,
      req.body.latitude,
      req.body.longitude
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: `Delivery Id: ${_deliveryId.toString()}, Batch Number: ${req.body.batchNumber.toString()}`,
    });
  } catch (error)
  {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = coffeeCherryDelivery;

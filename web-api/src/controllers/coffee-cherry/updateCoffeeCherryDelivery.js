const fabricNetwork = require("../../fabricNetwork");

const updateCoffeeCherryDelivery = async (req, res, next) =>
{
  try
  {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeCherryGrowerContract"
    );

    let tx = await contract.submitTransaction(
      "updateCoffeeCherryDelivery",

      req.body.deliveryId,
      req.body.batchNumber,
      req.body.quantity,
      req.body.unitOfMeasure,
      req.body.farmPlace,
      req.body.coffeegrower,
      req.body.collectionDate,
      req.body.sellingPrice,
      req.body.warehouseId,
      req.body.currency,
      req.body.deliveredTo,
      req.body.latitude,
      req.body.longitude
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: `Delivery Id: ${req.body.deliveryId}, Batch Number: ${req.body.batchNumber}`,
    });
  } catch (error)
  {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = updateCoffeeCherryDelivery;

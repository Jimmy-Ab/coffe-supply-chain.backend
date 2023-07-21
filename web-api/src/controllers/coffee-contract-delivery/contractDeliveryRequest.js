const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");
const contractDeliveryRequest = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeAgreementDeliveryContract"
    );
    const _id = getId();
    let tx = await contract.submitTransaction(
      "contractDeliveryRequest",
      _id,
      req.body.contractId,
      req.body.quantity,
      req.body.deliveryCountry,
      req.body.deliveryCity,
      req.body.deliveryLongtitude,
      req.body.deliveryLatitude,
      req.body.coffeePrice,
      req.body.coffeeType,
      req.body.deliveryDate,
      req.body.shipmentId,
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
module.exports = contractDeliveryRequest;

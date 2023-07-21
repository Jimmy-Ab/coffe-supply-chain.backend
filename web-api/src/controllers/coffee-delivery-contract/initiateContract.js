const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");
const initiateContract = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeAgreementCoffeeExporterContract"
    );
    const _farmerId = getId();
    let tx = await contract.submitTransaction(
      "prepareContract",
      _farmerId,
      req.body.contractGoal,
      req.body.seller,
      req.body.buyer,
      req.body.sellerRight,
      req.body.sellerObligation,
      req.body.buyerRight,
      req.body.buyerObligation,
      req.body.BuyerRemark,
      req.body.cta,
      req.body.expectedQuantity,
      req.body.unit,
      req.body.deliveryAddress,
    /*   req.body.deliveryCountry,
      req.body.deliveryCity,
      req.body.deliveryLongtitude,
      req.body.deliveryLatitude, */
      req.body.pricePercentage,
      req.body.contractType,
      req.body.startDate,
      req.body.endDate
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
module.exports = initiateContract;

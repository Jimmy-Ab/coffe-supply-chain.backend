const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");
const setCoffeeDailyPrice = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeDailyPriceContract"
    );
    const _coffeeDailyPriceId = getId();
    let tx = await contract.submitTransaction(
      "setCoffeeDailyPrice",
      _coffeeDailyPriceId,
      req.body.date,
      req.body.coffeeType,
      req.body.grade,
      req.body.price,
      req.body.currency,
      req.body.measurmentUnit
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: _coffeeDailyPriceId.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = setCoffeeDailyPrice;

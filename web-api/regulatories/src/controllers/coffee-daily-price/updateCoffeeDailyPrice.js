const fabricNetwork = require("../../fabricNetwork");

const updateCoffeeDailyPrice = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
        "CoffeeDailyPriceContract"
    );
    let tx = await contract.submitTransaction(
      "updateCoffeeDailyPrice",
      req.body.id,
      req.body.date,
      req.body.coffeeType, 
      req.body.grade,
      req.body.price, 
      req.body.currency, 
      req.body.measurmentUnit,
   
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: tx.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = updateCoffeeDailyPrice;

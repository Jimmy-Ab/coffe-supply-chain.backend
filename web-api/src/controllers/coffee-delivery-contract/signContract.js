const fabricNetwork = require("../../fabricNetwork");

const signContract = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeAgreementCoffeeSupplierContract"
    );
    let tx = await contract.submitTransaction(
      "signCoffeeContract",
      req.body.id,
      req.body.sellerRemark
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: req.body.id,
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = signContract;

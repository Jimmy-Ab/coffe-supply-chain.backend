const fabricNetwork = require("../../fabricNetwork");

const grantCertificate = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeTranporationCertificateContract"
    );
    let tx = await contract.submitTransaction(
      "grantCertificate",
      req.body.id,
      req.body.startDate,
      req.body.endDate
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

module.exports = grantCertificate;

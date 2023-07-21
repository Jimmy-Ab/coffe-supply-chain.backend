const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");

const requestCertificate = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "CoffeeTranporationCertificateContract"
    );
    const _id = getId();
    let tx = await contract.submitTransaction(
      "requestCertificate",
      _id,
      req.body.givenFor,
      req.body.address,
      req.body.nationality,
      req.body.tinNumber,
      req.body.loadingTransportLicence,
      req.body.loadingTrucks
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

module.exports = requestCertificate;

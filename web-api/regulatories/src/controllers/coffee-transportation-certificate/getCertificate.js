const fabricNetwork = require("../../fabricNetwork");

const getCertificate = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "CoffeeTranporationCertificateContract"
    );
    const result = await contract.evaluateTransaction(
      "getCertificate",
      req.params.id.toString()
    );
    let response = JSON.parse(result.toString());
    res.json({ result: response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = getCertificate;

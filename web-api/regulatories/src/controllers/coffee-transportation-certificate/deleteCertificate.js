const fabricNetwork = require("../../fabricNetwork");

const deleteCertificate = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
       "CoffeeTranporationCertificateContract"
    );
    const id = req.params.id;
    let tx = await contract.submitTransaction("deleteCertificate", id);
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

module.exports = deleteCertificate;

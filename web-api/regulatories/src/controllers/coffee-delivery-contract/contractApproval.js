const fabricNetwork = require("../../fabricNetwork");

const contractApproval = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "CoffeeAgreementRegulatorContract"
    );
    let tx = await contract.submitTransaction(
      "contractApproval",
      req.body.id,
      req.body.ectRemark
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

module.exports = contractApproval;

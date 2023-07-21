const fabricNetwork = require("../../fabricNetwork");

const getAllCertificate = async (req, res, next) =>
{
  try
  {
    const contract = await fabricNetwork.connectNetwork(

      "CoffeeTranporationCertificateContract"
    );
    const result = await contract.evaluateTransaction("getAllCertificate");
    let response = JSON.parse(result.toString());
    res.json({ response });
  } catch (error)
  {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = getAllCertificate;

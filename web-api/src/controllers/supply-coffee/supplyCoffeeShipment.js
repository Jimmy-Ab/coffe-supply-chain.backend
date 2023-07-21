const fabricNetwork = require("../../fabricNetwork");
const getId = require("../../helpers/id-generator");

const supplyCoffeeShipment = async (req, res, next) => {
  try {
    const contract = await fabricNetwork.connectNetwork(
      "connection-producer.json",
      "wallet/wallet-producer",
      "SupplyCoffeeCoffeeSupplierContract"
    );
    const id = getId();
    let tx = await contract.submitTransaction(
      "supplyCoffeeShipment",
      id,
      req.body.owner,
      req.body.destination,
      req.body.batchNo,
      req.body.transporter,
      req.body.truck,
     // req.body.shipmentDate,
     new Date()
    );
    res.json({
      status: "OK - Transaction has been submitted",
      txid: id.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = supplyCoffeeShipment;

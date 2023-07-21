const fabricNetwork = require("../../fabricNetwork");

const deleteSupplyCoffee = async (req, res, next) =>
{
    try
    {
        const contract = await fabricNetwork.connectNetwork(
            "SupplyCoffeeCoffeeSupplierContract"
        );
        const owner = req.params.owner;
        const batchNumber = req.params.batchNumber;
        let tx = await contract.submitTransaction(
            "deleteSupplyCoffee",
            owner,
            batchNumber,
        );
        res.json({
            status: "OK - Transaction has been submitted",
            batchNumber: batchNumber,
        });
    } catch (error)
    {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error,
        });
    }
};

module.exports = deleteSupplyCoffee;

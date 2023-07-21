const fabricNetwork = require('../../fabricNetwork');

const getSupplyCoffeeOfOwner = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('SupplyCoffeeCoffeeSupplierContract');
        const result = await contract.evaluateTransaction('getSupplyCoffeeOfOwner',
            req.params.owner.toString());
        let response = JSON.parse(result.toString());
        res.json({ result: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = getSupplyCoffeeOfOwner;
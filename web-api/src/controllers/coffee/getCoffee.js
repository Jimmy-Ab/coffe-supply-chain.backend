const fabricNetwork = require('../../fabricNetwork');

const getCoffee = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('connection-retailer.json', 'wallet/wallet-retailer', 'CoffeeCherryInvestorContract');
        const result = await contract.evaluateTransaction('getCoffee',
            req.params.batchNumber.toString(), req.params.bagId.toString());
        let response = JSON.parse(result.toString());
        res.json({ result: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = getCoffee;
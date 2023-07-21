const fabricNetwork = require('../../fabricNetwork');

const getCoffeeCherryBatchDelivery = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('CoffeeCherryInvestorContract');
        const result = await contract.evaluateTransaction('getCoffeeCherryBatchDelivery',
        req.params.owner.toString(), req.params.batchNumber.toString());
        let response = JSON.parse(result.toString());
        res.json({ result: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = getCoffeeCherryBatchDelivery;
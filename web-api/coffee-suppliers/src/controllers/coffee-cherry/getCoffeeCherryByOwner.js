const fabricNetwork = require('../../fabricNetwork');

const getCoffeeCherryByOwner = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('CoffeeCherryInvestorContract');
        const result = await contract.evaluateTransaction('getCoffeeCherryByOwner',
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

module.exports = getCoffeeCherryByOwner;
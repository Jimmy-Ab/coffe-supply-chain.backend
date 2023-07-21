const fabricNetwork = require('../../fabricNetwork');

const getCoffeeGrower = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('CoffeeGrowerContract');
        const result = await contract.evaluateTransaction('getCoffeeGrower', req.params.id.toString());
        let response = JSON.parse(result.toString());
        res.json({ result: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = getCoffeeGrower;
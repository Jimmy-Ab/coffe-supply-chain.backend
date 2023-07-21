const fabricNetwork = require('../../fabricNetwork');

const getPricePerYear = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('CoffeeDailyPriceContract');
        const result = await contract.evaluateTransaction('getPricePerYear',
            req.params.date.toString());
        let response = JSON.parse(result.toString());
        res.json({ result: response });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = getPricePerYear;
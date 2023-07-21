const fabricNetwork = require('../../fabricNetwork');

const coffeeProduction = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('connection-producer.json', 'wallet/wallet-producer', 'CoffeeCherryInvestorContract');
        let tx = await contract.submitTransaction('coffeeProduction',
            req.body.bagId,
            req.body.bagSize,
            req.body.coffeeType,
            req.body.coffeeCherryBatchNo,
            req.body.batchNumber,
            req.body.measurmentUnit,
            req.body.productionPlace,
            req.body.owner
        );
        res.json({
            status: 'OK - Transaction has been submitted',
            txid: tx.toString()
        });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = coffeeProduction;
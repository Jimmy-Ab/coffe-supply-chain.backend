const fabricNetwork = require('../../fabricNetwork');

const coffeeWarehousing = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('connection-producer.json', 'wallet/wallet-producer', 'CoffeeCherryInvestorContract');
        let tx = await contract.submitTransaction('coffeeWarehousing',
            req.body.batchNumber,
            req.body.warehouseId,
            req.body.fromDate,
            req.body.toDate,
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

module.exports = coffeeWarehousing;
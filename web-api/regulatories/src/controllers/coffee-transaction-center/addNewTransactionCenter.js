const fabricNetwork = require('../../fabricNetwork');

const addNewTransactionCenter = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('CoffeeTransactionCenterContract');
        let tx = await contract.submitTransaction('addNewTransactionCenter',
            req.body.place, req.body.address, req.body.size,
            req.body.capacity, req.body.coffeeProducers, req.body.farmSize, req.body.hasSortingBed,
            req.body.hasParkingPlace, req.body.hasDailyMarketPriceTickerBoard, req.body.hasDryWestDisposal,
            req.body.stablishedAt, req.body.latitude, req.body.longitude);
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

module.exports = addNewTransactionCenter;
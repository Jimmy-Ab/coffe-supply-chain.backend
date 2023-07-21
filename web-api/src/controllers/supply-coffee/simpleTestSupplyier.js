const fabricNetwork = require('../../fabricNetwork');

const simpleTestSupplier = async (req, res, next) => {
    try {
        const contract = await fabricNetwork.connectNetwork('connection-producer.json', 'wallet/wallet-producer', 'SupplyCoffeeCoffeeSupplierContract');

        let tx = await contract.submitTransaction('simpleTest',
            req.body.a,
            req.body.b
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
module.exports = simpleTestSupplier;
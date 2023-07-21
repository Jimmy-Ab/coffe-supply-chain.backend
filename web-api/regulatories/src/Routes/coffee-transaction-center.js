const router = require("express").Router();
const {
    addNewTransactionCenter,
    deleteCoffeeTransactionCenter,
    getCoffeeTransactionCenter,
    getAllCoffeeTransactionCenter
} = require('../controllers/coffee-transaction-center');

router.route("/get-all-coffee-transaction-center").post(getAllCoffeeTransactionCenter);
router.route("/get-coffee-transaction-center/:id").get(getCoffeeTransactionCenter);
router.route("/register-coffee-transaction-center").post(addNewTransactionCenter);
router.route("/delete-coffee-growers/:id").delete(deleteCoffeeTransactionCenter);

module.exports = router;
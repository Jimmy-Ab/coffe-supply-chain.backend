const router = require("express").Router();
const {
    addNewTransactionCenter,
    deleteCoffeeTransactionCenter,
    getCoffeeTransactionCenter,
    getAllCoffeeTransactionCenter
} = require('../controllers/coffee-transaction-center');
const { protect } = require('../middleware/auth');

router.route("/get-all-coffee-transaction-center").post(protect, getAllCoffeeTransactionCenter);
router.route("/get-coffee-transaction-center/:id").getprotect, (getCoffeeTransactionCenter);
router.route("/register-coffee-transaction-center").post(protect, addNewTransactionCenter);
router.route("/delete-coffee-growers/:id").delete(protect, deleteCoffeeTransactionCenter);

module.exports = router;
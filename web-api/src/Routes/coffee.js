const router = require('express').Router();

const {
    coffeeProduction,
    coffeeGrading,
    coffeeWarehousing,
    buyCoffeeCherry,
    getAllCoffeeCherry,
    getCoffee,
    getCoffeeBatch,
    getAllCoffee,
} = require("../controllers/coffee");

router.route("/coffee-production").put(coffeeProduction);
router.route("/coffee-grading").put(coffeeGrading);
router.route("/buy-coffee-cherry").put(buyCoffeeCherry);
router.route("/store-coffee").put(coffeeWarehousing);
router.route("/get-all-coffee-cherry-delivery").get(getAllCoffeeCherry);
router.route("/get-coffee/:batchNumber/:bagId").get(getCoffee);
router.route("/get-coffee-batch/:batchNumber").get(getCoffeeBatch);
router.route("/get-all-coffee/").get(getAllCoffee);

module.exports = router;
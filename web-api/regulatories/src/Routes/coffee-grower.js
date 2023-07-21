const router = require("express").Router();

const {
    getAllCoffeeGrowers,
    getCoffeeGrower,

    addDelivery } = require("../controllers/coffee-grower");

router.route("/get-coffee-grower/:id").get(getCoffeeGrower);
router.route("/get-all-coffee-growers").get(getAllCoffeeGrowers);

module.exports = router;
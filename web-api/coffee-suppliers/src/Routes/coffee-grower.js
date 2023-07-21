const router = require("express").Router();

const {
    getAllCoffeeGrowers,
    getCoffeeGrower,
    registerCoffeeGrower,
    removeCoffeeGrower,
    updateCoffeeGrower,
    addDelivery } = require("../controllers/coffee-grower");
const { protect } = require('../middleware/auth');

router.route("/get-coffee-grower/:id").get(protect, getCoffeeGrower);
router.route("/register-coffee-grower").post(protect, registerCoffeeGrower);
router.route("/get-all-coffee-growers").get(protect, getAllCoffeeGrowers);
router.route("/delete-coffee-growers/:id").delete(protect, removeCoffeeGrower);
router.route("/add-delivery").put(protect, addDelivery);
router.route("/update-coffee-grower").put(protect, updateCoffeeGrower);
module.exports = router;
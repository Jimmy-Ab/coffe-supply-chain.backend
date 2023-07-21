const router = require("express").Router();
const { protect } = require('../middleware/auth');

const {

  supplyCoffeeShipment,

  getAllNaturalCoffeeInd,
  getNaturalCoffeeInd,
  getAllWashedCoffeeInd,
  getWashedCoffeeInd,
  getSupplyCoffeeOfOwner,
  getAllSupplyCoffeeShipment,
  getSupplyCoffeeShipment,
  returnShipment,
  coffeeGrading,

} = require("../controllers/supply-coffee");

router.route("/supply-coffee-shipment").put(protect, supplyCoffeeShipment);



router.route("/get-all-natural-coffee-ind").get(protect, getAllNaturalCoffeeInd);
router.route("/get-natural-coffee-ind/:owner").get(protect, getNaturalCoffeeInd);
router.route("/get-all-washed-coffee-ind").get(protect, getAllWashedCoffeeInd);
router.route("/get-washed-coffee-ind/:owner").get(protect, getWashedCoffeeInd);
router.route("/get-supply-coffee/:owner").get(protect, getSupplyCoffeeOfOwner);
router.route("/get-all-supply-coffee-shipment").get(protect, getAllSupplyCoffeeShipment);
router.route("/get-supply-coffee-shipment/:id").get(protect, getSupplyCoffeeShipment);

router.route("/return-supply-coffee-shipment").put(protect, returnShipment);
router.route("/grade").put(protect, coffeeGrading);
module.exports = router;

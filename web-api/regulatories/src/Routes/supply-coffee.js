const router = require("express").Router();

const {

  registerWashedCoffeeProcessingInd,
  registerNaturalCoffeeProcessingInd,

  getAllNaturalCoffeeInd,
  getNaturalCoffeeInd,
  getAllWashedCoffeeInd,
  getWashedCoffeeInd,
  getSupplyCoffeeOfOwner,

  getAllSupplyCoffeeShipment,
  getSupplyCoffeeShipment,

  RemoveWashedCoffeeProcessingWarehouseInd,
  RemoveNaturalCoffeeProcessingWarehouseInd,
  UpdateWashedCoffeeProcessingWarehouseInd,
  updateNaturalCoffeeProcessingWarehouseInd,
} = require("../controllers/supply-coffee");


router
  .route("/register-washed-coffee-ind")
  .post(registerWashedCoffeeProcessingInd);
router
  .route("/register-natural-coffee-ind")
  .post(registerNaturalCoffeeProcessingInd);
router
  .route("/update-washed-coffee-ind")
  .put(UpdateWashedCoffeeProcessingWarehouseInd);
router
  .route("/update-natural-coffee-ind")
  .put(updateNaturalCoffeeProcessingWarehouseInd);
router.route("/get-all-natural-coffee-ind").get(getAllNaturalCoffeeInd);
router.route("/get-natural-coffee-ind/:owner").get(getNaturalCoffeeInd);
router.route("/get-all-washed-coffee-ind").get(getAllWashedCoffeeInd);
router.route("/get-washed-coffee-ind/:owner").get(getWashedCoffeeInd);
router.route("/get-supply-coffee/:owner").get(getSupplyCoffeeOfOwner);
router.route("/get-all-supply-coffee-shipment").get(getAllSupplyCoffeeShipment);
router.route("/get-supply-coffee-shipment/:id").get(getSupplyCoffeeShipment);

router
  .route("/delete-washed-coffee-ind/:id")
  .delete(RemoveWashedCoffeeProcessingWarehouseInd);
router
  .route("/delete-natural-coffee-ind/:id")
  .delete(RemoveNaturalCoffeeProcessingWarehouseInd);


module.exports = router;

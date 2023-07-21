const router = require("express").Router();
const { protect } = require('../middleware/auth');

const {
  produceWashedSupplyCoffee,
  produceNaturalCoffee,
  coffeeGrading,
  deleteSupplyCoffee,
  supplyCoffeeShipment,
  registerWashedCoffeeProcessingInd,
  registerNaturalCoffeeProcessingInd,

  getAllNaturalCoffeeInd,
  getNaturalCoffeeInd,
  getAllWashedCoffeeInd,
  getWashedCoffeeInd,
  getSupplyCoffeeOfOwner,

  deleteSupplyCoffeeShipment,
  getAllSupplyCoffeeShipment,
  getSupplyCoffeeShipment,
  deliverShipment,
  returnShipment,
  RemoveWashedCoffeeProcessingWarehouseInd,
  RemoveNaturalCoffeeProcessingWarehouseInd,
  UpdateWashedCoffeeProcessingWarehouseInd,
  updateNaturalCoffeeProcessingWarehouseInd,
} = require("../controllers/supply-coffee");

router.route("/produce-natural-supply-coffee").post(protect, produceNaturalCoffee);
router.route("/produc-washed-supply-coffee").post(protect, produceWashedSupplyCoffee);
router.route("/grade").put(protect, coffeeGrading);
router.route("/supply-coffee-shipment").put(protect, supplyCoffeeShipment);
router
  .route("/register-washed-coffee-ind")
  .post(protect, registerWashedCoffeeProcessingInd);
router
  .route("/register-natural-coffee-ind")
  .post(protect, registerNaturalCoffeeProcessingInd);
router
  .route("/update-washed-coffee-ind")
  .put(protect, UpdateWashedCoffeeProcessingWarehouseInd);
router
  .route("/update-natural-coffee-ind")
  .put(protect, updateNaturalCoffeeProcessingWarehouseInd);
router.route("/get-all-natural-coffee-ind").get(protect, getAllNaturalCoffeeInd);
router.route("/get-natural-coffee-ind/:owner").get(protect, getNaturalCoffeeInd);
router.route("/get-all-washed-coffee-ind").get(protect, getAllWashedCoffeeInd);
router.route("/get-washed-coffee-ind/:owner").get(protect, getWashedCoffeeInd);
router.route("/get-supply-coffee/:owner").get(protect, getSupplyCoffeeOfOwner);
router.route("/get-all-supply-coffee-shipment").get(protect, getAllSupplyCoffeeShipment);
router.route("/get-supply-coffee-shipment/:id").get(protect, getSupplyCoffeeShipment);
router
  .route("/delete-supply-coffee-shipment/:id")
  .delete(protect, deleteSupplyCoffeeShipment);
router
  .route("/delete-washed-coffee-ind/:id")
  .delete(protect, RemoveWashedCoffeeProcessingWarehouseInd);
router
  .route("/delete-natural-coffee-ind/:id")
  .delete(protect, RemoveNaturalCoffeeProcessingWarehouseInd);
router.route("/deliver-supply-coffee-shipment").put(protect, deliverShipment);
router.route("/return-supply-coffee-shipment").put(protect, returnShipment);

router
  .route("/delete-supply-coffee/:owner/:batchNumber")
  .delete(protect, deleteSupplyCoffee);

module.exports = router;

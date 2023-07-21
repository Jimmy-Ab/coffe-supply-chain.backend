const router = require("express").Router();
const {
  coffeeCherryDelivery,
  getCoffeeCherryDelivery,
  getCoffeeCherryBatchDelivery,
  qualityInspection,
  getAllCoffeeCherry,
  getCoffeeCherryByOwner,
  deletecoffeeCherryDelivery,
  updateCoffeeCherryDelivery
} = require("../controllers/coffee-cherry");
const { protect } = require('../middleware/auth');

router.route("/coffee-cherry-delivery").post(protect, coffeeCherryDelivery);
router.route("/update-coffee-cherry-delivery").put(protect, updateCoffeeCherryDelivery);
router.route("/coffee-cherry-quality-inspection").put(protect, qualityInspection);
router
  .route("/get-coffee-cherry-delivery/:owner/:batchNumber/:deliveryId")
  .get(protect, getCoffeeCherryDelivery);
router
  .route("/get-coffee-cherry-batch-delivery/:owner/:batchNumber")
  .get(protect, getCoffeeCherryBatchDelivery);
router.route("/get-coffee-cherry-by-owner/:owner").get(protect, getCoffeeCherryByOwner);
router.route("/get-all-coffee-cherry").get(protect, getAllCoffeeCherry);
router
  .route("/delete-coffee-cherry/:deliveredTo/:batchNumber/:deliveryId")
  .delete(protect, deletecoffeeCherryDelivery);

module.exports = router;

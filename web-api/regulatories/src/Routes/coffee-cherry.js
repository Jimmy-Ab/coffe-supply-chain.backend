const router = require("express").Router();
const {
  getCoffeeCherryDelivery,
  getCoffeeCherryBatchDelivery,
  qualityInspection,
  getAllCoffeeCherry,
  getCoffeeCherryByOwner,

} = require("../controllers/coffee-cherry");


router.route("/coffee-cherry-quality-inspection").put(qualityInspection);
router
  .route("/get-coffee-cherry-delivery/:owner/:batchNumber/:deliveryId")
  .get(getCoffeeCherryDelivery);
router
  .route("/get-coffee-cherry-batch-delivery/:owner/:batchNumber")
  .get(getCoffeeCherryBatchDelivery);
router.route("/get-coffee-cherry-by-owner/:owner").get(getCoffeeCherryByOwner);
router.route("/get-all-coffee-cherry").get(getAllCoffeeCherry);

module.exports = router;

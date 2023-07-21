const router = require("express").Router();

const {
  produceExportCoffee,
  registerExportCoffeeProductionInd,
  coffeeGrading,
  removeExportCoffeeBatch,
  getAllExportCoffee,
  getExportCoffeeOfOwner,
  getAllExportCoffeeProductionInd,
  getExportCoffeeProductionInd,
  removeExportCoffeeProductionInd,
  UpdateExportCoffeeProductionInd,
} = require("../controllers/export-coffee");
const { protect } = require('../middleware/auth');

router.route("/get-all/").get(protect, getAllExportCoffee);
router.route("/get-all-ind/:owner").get(protect, getAllExportCoffeeProductionInd);
router.route("/get/:owner").get(protect, getExportCoffeeOfOwner);
router.route("/get-ind/:owner/:id").get(protect, getExportCoffeeProductionInd);
router.route("/produce").post(protect, produceExportCoffee);
router.route("/register-ind").post(protect, registerExportCoffeeProductionInd);
router.route("/update-ind").put(protect, UpdateExportCoffeeProductionInd);
router.route("/grade").put(protect, coffeeGrading);
router.route("/delete/:owner/:batchNumber").delete(protect, removeExportCoffeeBatch);
router.route("/delete-ind/:owner/:id").delete(protect, removeExportCoffeeProductionInd);
module.exports = router;

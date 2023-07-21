const router = require("express").Router();

const {
  registerExportCoffeeProductionInd,

  getAllExportCoffee,
  getExportCoffeeOfOwner,
  getAllExportCoffeeProductionInd,
  getExportCoffeeProductionInd,
  removeExportCoffeeProductionInd,
  UpdateExportCoffeeProductionInd,
} = require("../controllers/export-coffee");
router.route("/get-all/").get(getAllExportCoffee);
router.route("/get-all-ind/:owner").get(getAllExportCoffeeProductionInd);
router.route("/get/:owner").get(getExportCoffeeOfOwner);
router.route("/get-ind/:owner/:id").get(getExportCoffeeProductionInd);
router.route("/register-ind").post(registerExportCoffeeProductionInd);
router.route("/update-ind").put(UpdateExportCoffeeProductionInd);
router.route("/delete-ind/:owner/:id").delete(removeExportCoffeeProductionInd);
module.exports = router;

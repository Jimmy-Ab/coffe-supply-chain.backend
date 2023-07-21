const router = require("express").Router();

const {

  contractApproval,
  contractTermination,
  removeCoffeeDeliveryAgreement,
  getCoffeeDeliveryAgreement,
  getAllCoffeeDeliveryAgreement,
} = require("../controllers/coffee-delivery-contract");

router.route("/get-contract/:id").get(getCoffeeDeliveryAgreement);
router.route("/get-all-contract").get(getAllCoffeeDeliveryAgreement);
router.route("/delete-contract/:id").delete(removeCoffeeDeliveryAgreement);
router.route("/approve-contact").put(contractApproval);
router.route("/terminate-contact").put(contractTermination);
module.exports = router;

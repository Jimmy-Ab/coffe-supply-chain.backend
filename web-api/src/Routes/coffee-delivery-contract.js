const router = require("express").Router();

const {
  initiateContract,
  signContract,
  contractApproval,
  contractTermination,
  removeCoffeeDeliveryAgreement,
  getCoffeeDeliveryAgreement,
  getAllCoffeeDeliveryAgreement,
} = require("../controllers/coffee-delivery-contract");
const { protect } = require('../middleware/auth');

router.route("/get-contract/:id").get(protect, getCoffeeDeliveryAgreement);
router.route("/initiat-contact").post(protect, initiateContract);
router.route("/get-all-contract").get(protect, getAllCoffeeDeliveryAgreement);
router.route("/delete-contract/:id").delete(protect, removeCoffeeDeliveryAgreement);
router.route("/sign-contact").put(protect, signContract);
router.route("/approve-contact").put(protect, contractApproval);
router.route("/terminate-contact").put(protect, contractTermination);
module.exports = router;

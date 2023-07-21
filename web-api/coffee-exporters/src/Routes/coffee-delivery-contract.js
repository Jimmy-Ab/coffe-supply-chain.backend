const router = require("express").Router();

const {
  initiateContract,

  removeCoffeeDeliveryAgreement,
  getCoffeeDeliveryAgreement,
  getAllCoffeeDeliveryAgreement,
} = require("../controllers/coffee-delivery-contract");
const { protect } = require('../middleware/auth');

router.route("/get-contract/:id").get(protect, getCoffeeDeliveryAgreement);
router.route("/initiat-contact").post(protect, initiateContract);
router.route("/get-all-contract").get(protect, getAllCoffeeDeliveryAgreement);
router.route("/delete-contract/:id").delete(protect, removeCoffeeDeliveryAgreement);

module.exports = router;

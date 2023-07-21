const router = require("express").Router();

const {
  contractDeliveryApproval,
  contractDeliveryPayment,
  contractDeliveryRejection,
  getAllDeliveryAgreements,
  getContractDelivery,
  getContractDeliveryPerContract,
  removeContractDelivery,
} = require("../controllers/coffee-contract-delivery");
const { protect } = require('../middleware/auth');

router.route("/get-contract/:contractId/:id").get(protect, getContractDelivery);
router.route("/get-contract/:contractId").get(protect, getContractDeliveryPerContract);
router.route("/get-all-contract-delivery").get(protect, getAllDeliveryAgreements);
router.route("/delete/:contractId/:id").delete(protect, removeContractDelivery);
router.route("/approve-contact-delivery").put(protect, contractDeliveryApproval);
router.route("/reject-contact-delivery").put(protect, contractDeliveryRejection);
router.route("/pay-contact-delivery").put(protect, contractDeliveryPayment);
module.exports = router;

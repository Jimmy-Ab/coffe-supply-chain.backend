const router = require("express").Router();

const {

  contractDeliveryRequest,
  getAllDeliveryAgreements,
  getContractDelivery,
  getContractDeliveryPerContract,
} = require("../controllers/coffee-contract-delivery");
const { protect } = require('../middleware/auth');

router.route("/get-contract/:contractId/:id").get(protect, getContractDelivery);
router.route("/get-contract/:contractId").get(protect, getContractDeliveryPerContract);
router.route("/request-contact-delivery").post(protect, contractDeliveryRequest);
router.route("/get-all-contract-delivery").get(protect, getAllDeliveryAgreements);

module.exports = router;

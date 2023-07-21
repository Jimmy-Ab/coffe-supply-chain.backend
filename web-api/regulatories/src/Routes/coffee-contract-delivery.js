const router = require("express").Router();

const {

  getAllDeliveryAgreements,
  getContractDelivery,
  getContractDeliveryPerContract,
} = require("../controllers/coffee-contract-delivery");

router.route("/get-contract/:contractId/:id").get(getContractDelivery);
router.route("/get-contract/:contractId").get(getContractDeliveryPerContract);
router.route("/get-all-contract-delivery").get(getAllDeliveryAgreements);

module.exports = router;

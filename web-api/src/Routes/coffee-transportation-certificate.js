const router = require("express").Router();

const {
  requestCertificate,
  grantCertificate,
  revokeCertificate,
  deleteCertificate,
  getAllCertificate,
  getCertificate,
} = require("../controllers/coffee-transportation-certificate");
const { protect } = require('../middleware/auth');

router.route("/get/:id").get(protect, getCertificate);
router.route("/get-all").get(protect, getAllCertificate);
router.route("/request").post(protect, requestCertificate);
router.route("/grant").put(protect, grantCertificate);
router.route("/revoke").put(protect, revokeCertificate);
router.route("/delete/:id").delete(protect, deleteCertificate);

module.exports = router;

const router = require("express").Router();

const {
  requestCertificate,
  grantCertificate,
  revokeCertificate,
  deleteCertificate,
  getAllCertificate,
  getCertificate,
} = require("../controllers/coffee-transportation-certificate");

router.route("/get/:id").get(getCertificate);
router.route("/get-all").get(getAllCertificate);
router.route("/request").post(requestCertificate);
router.route("/grant").put(grantCertificate);
router.route("/revoke").put(revokeCertificate);
router.route("/delete/:id").delete(deleteCertificate);

module.exports = router;

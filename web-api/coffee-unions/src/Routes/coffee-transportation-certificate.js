const router = require("express").Router();

const {
  requestCertificate,
  getAllCertificate,
  getCertificate,
} = require("../controllers/coffee-transportation-certificate");
const { protect } = require('../middleware/auth');
router.route("/request").post(protect, requestCertificate);
router.route("/get/:id").get(protect, getCertificate);
router.route("/get-all").get(protect, getAllCertificate);


module.exports = router;

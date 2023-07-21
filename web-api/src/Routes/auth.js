const express = require("express");
const router = express.Router();

const { Register, Login, ForgotPassword, ResetPassword } = require("../controllers/auth");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/forgotpassword").post(ForgotPassword);
router.route("/resetpassword/:resetToken").put(ResetPassword);

module.exports = router;
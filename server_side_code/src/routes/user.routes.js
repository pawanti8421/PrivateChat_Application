const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  sendOtpToUser,
} = require("../controllers/user.controllers");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.route("/register").post(registerUser);
router.route("/send-otp").post(sendOtpToUser);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, getCurrentUser);

module.exports = router;

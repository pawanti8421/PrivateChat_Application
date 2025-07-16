const express = require("express");
const router = express.Router();
const {
  addContact,
  getAllContact,
  updateContactDetail,
} = require("../controllers/contact.controllers");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.route("/add-contact").post(verifyJWT, addContact);
router.route("/get-all-contact").get(verifyJWT, getAllContact);
router.route("/update-contact-detail").post(verifyJWT, updateContactDetail);

module.exports = router;

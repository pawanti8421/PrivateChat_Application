const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer.middleware.js");
const {
  storeMessage,
  getAllMessage,
  storeMediaMessage,
} = require("../controllers/message.controllers");

router.route("/new-message").post(storeMessage);
router.route("/get-all-messages").post(getAllMessage);
router.route("/store-media").post(upload.single("file"), storeMediaMessage);

module.exports = router;

const express = require("express");

const {
  uploadPicture,
  signup,
  login
} = require("../controllers/users");
const { upload } = require("../middlewares/multipart");
const { auth } = require("../middlewares/auth");
const { isSameUser } = require("../middlewares/isSameUser");
const router = express.Router();

// add request body validation
router.post("/", signup);

// add request body validation
router.post("/login", login);


router.put(
  "/:userId/picture_url",
  auth,
  isSameUser,
  upload.single("image"),
uploadPicture
);

module.exports = router;

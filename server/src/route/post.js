const express = require("express");
const { fileUploader } = require("../middleware/multer");
const router = express.Router();
const postController = require("../controller").postController;

//post
router.post(
  "/",
  fileUploader({ destinationFolder: "post" }).single("post"),
  postController.insertPost
);

module.exports = router;

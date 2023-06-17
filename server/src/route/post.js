const express = require("express");
const { fileUploader } = require("../middleware/multer");
const router = express.Router();
const postController = require("../controller").postController;

//post
router.post(
  "/",
  fileUploader({ destinationFolder: "Post" }).single("Post"),
  postController.insertPost
);

router.get("/getpost", postController.getPost);

module.exports = router;

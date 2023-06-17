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
router.get("/getpost1/:id", postController.getPost1);

module.exports = router;

const express = require("express");
const { fileUploader } = require("../middleware/multer");
// const { empControllers } = require("../controllers");
const router = express.Router();
const userController = require("../controller").userController;

router.post("/register", userController.register);
router.get("/gbe", userController.getByEmail);
router.get("/login", userController.login);
router.get("/gbt", userController.getByToken);

// verify
router.get("/verify", userController.reqVerify); // verify request
router.get("/verify/:token", userController.verify); // verifying
// router.patch("/token/verify", userController.getByToken, userController.verify); //verify from email

// edit profile
router.patch(
  "/:id",
  fileUploader({ destinationFolder: "Avatar" }).single("Avatar"),
  userController.editUser
);

// reset password request
router.get("/forget", userController.forgetPass);
router.patch("/change/:token", userController.changePass);
// router.patch(
//   "/token/change",
//   userController.getByToken,
//   userController.changePass
// ); // reset password

// avatar upload
router.post(
  "/image/v1/:id",
  fileUploader({ destinationFolder: "Avatar" }).single("Avatar"),
  userController.uploadAvatar
);

module.exports = router;

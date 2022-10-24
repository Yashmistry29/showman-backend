const router = require("express").Router();

const LoginController = require("../controllers/userController").login;
const SignupController = require("../controllers/userController").signup;
const ForgetPasswordController = require("../controllers/userController").forgetPassword;
const SignoutController = require("../controllers/userController").signout;

router.post("/login", LoginController);
router.post("/signup", SignupController);
router.post("/signout", SignoutController);
router.post("/forgetpassword", ForgetPasswordController);

module.exports = router;
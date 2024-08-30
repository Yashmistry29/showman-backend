const router = require("express").Router();

const {
  login,
  signup,
  forgetPassword,
  signout
} = require("../controllers/userController");

router.post("/login", login);
router.post("/signup", signup);
router.post("/signout", signout);
router.post("/forgetpassword", forgetPassword);

module.exports = router;
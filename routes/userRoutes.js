const router = require("express").Router();

const {
  login,
  signup,
  forgetPassword,
  signout
} = require("../controllers/userController");

// Legacy route: POST /user/login
// router.post("/login", login);
// Suggested new route: POST /user/sessions
router.post("/sessions", login);

// Legacy route: POST /user/signup
// router.post("/signup", signup);
// Suggested new route: POST /user/accounts
router.post("/accounts", signup);

// Legacy route: POST /user/signout
// router.post("/signout", signout);
// Suggested new route: DELETE /user/sessions
router.delete("/sessions", signout);

// Legacy route: POST /user/forgetpassword
// router.post("/forgetpassword", forgetPassword);
// Suggested new route: POST /user/password-resets
router.post("/password-resets", forgetPassword);

module.exports = router;
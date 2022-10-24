const { json } = require("express/lib/response");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  var message = {
    success: true,
    message: "Welcome to the SHOWMAN Backend",
  };
  res.send(message);
});

module.exports = router;
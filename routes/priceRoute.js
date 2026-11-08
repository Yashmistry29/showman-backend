const router = require("express").Router();

const { addPrice, getPrice } = require('../controllers/priceController');

// Legacy route: POST /price/editprice
// router.post("/editprice", addPrice);
// Suggested new route: POST /price
router.post("/", addPrice);

// Legacy route: POST /price/getprice
// router.post("/getprice", getPrice);
// Suggested new route: GET /price
router.get("/", getPrice);

module.exports = router;

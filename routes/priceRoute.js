const router = require("express").Router();

const { addPrice, getPrice } = require('../controllers/priceController');

router.post("/editprice", addPrice);
router.post("/getprice", getPrice);

module.exports = router;

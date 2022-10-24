const router = require("express").Router();

const addPriceController = require('../controllers/priceController').addPrice;
const getPriceController = require('../controllers/priceController').getPrice;

router.post("/editprice", addPriceController);
router.post("/getprice", getPriceController);

module.exports = router;

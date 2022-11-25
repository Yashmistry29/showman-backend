const router = require("express").Router();

const addPriceController = require('../controllers/priceController').addPrice;
const getPriceController = require('../controllers/priceController').getPrice;
const insertDocuments = require('../controllers/priceController').insertDocuments;

router.post("/editprice", addPriceController);
router.post("/getprice", getPriceController);
router.post("/insertdocuments", insertDocuments);

module.exports = router;

const mongoose = require('mongoose');
const PriceCollection = require('../models/price');
const data = require("../data/PriceOBJ.json");

const db = mongoose.connection;

class Price{
  addPrice = async (body) => {
    try {
      console.log(body);
      var data = {
        date: new Date().toISOString(),
        shirt_price: body.shirt_price,
        pant_price: body.pant_price
      }
      var resp = await PriceCollection.create(data);
      console.log(resp);
      return { success: true, message: 'Price Changed.' };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  getPrice = async () => {
    try {
      const price = {};

      var resp = await PriceCollection.findOne().sort({ date: -1 }).limit(1);
      price["shirt_price"] = resp.shirt_price;
      price["pant_price"] = resp.pant_price;
      return { success: true, message: 'Price Fetched Successfully',data:price};
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }
}

module.exports=exports=new Price()
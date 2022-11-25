const price = require('../models/price');
const data = require("../data/PriceOBJ.json");
const { query, orderBy, limit, collection, getDocs, addDoc, } = require('firebase/firestore');
const { db} = require('../database/database');

class Price{
  addPrice = async (body) => {
    try {
      console.log(body);
      return { success: true, message: 'Job created successfully' };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  getPrice = async () => {
    try {
      const q = await query(collection(db, "Price"), orderBy("date","desc"), limit(1));
      const doc = await getDocs(q);
      const price = {};
      doc.forEach((data) => {
        price["shirt_price"] = data.data().shirt_price;
        price["pant_price"] = data.data().pant_price;
      })
      return { success: true, message: 'Price Fetched Successfully',data:price};
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  insertDocuments = async () => {
    try {
      data.map((doc) => {
        addDoc(collection(db, "Price"), doc);
      })
      return { success: true, message: "DOC written SUCCESSFULLY" };
    }
    catch (err) {
      console.log(err)
      return { success: false, message: err.message };
    }
  }
}

module.exports=exports=new Price()
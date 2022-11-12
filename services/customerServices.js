const Customer = require('../models/customerModel');
const { doc, setDoc, getDoc, collection, getDocs, query, orderBy, limit, } = require('firebase/firestore');
const { db } = require("../database/database");

class customer{
  createCustomer = async (body) => {
    try {
      // console.log(body);
      var t_id;
      const data = {
        name: body.name,
        phone: body.phone,
        place: body.place,
      }

      const _doc = await getDoc(doc(db, 'Customer', "1"));
      if (!_doc.exists()) {
        data["c_id"] = 1;
        t_id = data.c_id.toString();
        console.log(data);
        await setDoc(doc(db, 'Customer', t_id), data);
      }

      else {
        var q = await query(collection(db, "Customer"), orderBy("c_id", 'desc'), limit(1));
        var c_docs = await getDocs(q);

        c_docs.forEach((res) => {
          data["c_id"] = res.data().c_id + 1;
        })

        t_id = data.c_id.toString();
        console.log(data);
        await setDoc(doc(db, 'Customer', t_id), data);
      }
      return{success:true,message:'Customer Created Successfully',data:data.c_id}
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  editCustomer = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  deleteCustomer = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  getCustomer = async (body) => {
    try {
      const _doc = await getDoc(doc(db, 'Customer', body.c_id));
      if (!_doc.exists()) {
        return {
          success: false,
          message:"Customer Doesnot exist in Database"
        }
      } else {
        // console.log(_doc.data());
        return {
          success: true,
          message: "Data Fetched Successfully",
          data: _doc.data()
        };
      }
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  getAllCustomers = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  getCustomerByName = async () => {
    try {
      const docs = await getDocs(collection(db, 'Customer'));
      const names=[]
      docs.forEach((doc) => {
        names.push({
          name: doc.data().name,
          id: doc.data().c_id,
          job_ids:doc.data().job_ids,
        });
      })
      return {success: true,message:"Data Fetched Successfully",data:names}
    }
    catch (err) {
      return { success: false, message: err.message };
    }
  }

  getCustomerByID = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  getCustomerByMobile = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  getCustomerBetweenDates = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }
}

module.exports= exports = new customer();
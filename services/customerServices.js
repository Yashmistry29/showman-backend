const Customer = require('../models/customerModel');
const { doc, setDoc, getDoc,collection,getDocs } = require('firebase/firestore');
const { db } = require("../database/database");

class customer{
  createCustomer= async(body) => { 
    try {
      // console.log(body);
      const data = {
        c_id: body.name.slice(0, 4) + body.phone.slice(7),
        name: body.name,
        phone: body.phone,
        place: body.address,
      }
      // console.log(data);
      await setDoc(doc(db, 'Customer', data.c_id), data);
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
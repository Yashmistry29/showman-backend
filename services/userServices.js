const mongoose = require("mongoose");
const md5 = require('md5');
const user = require('../models/userModel');

const db = mongoose.connection;


exports.Login = async (body) => {
    try {
      var query = { username: body.username };
      console.log(body)
      let resp = await user.findOne(query);
      console.log(resp);

      if (resp != null) {
        if (md5(body.password) === resp.password) {
          return { success: true, message: 'Login Successful' };
        } else {
          return { success: false, message: 'Invalid Username or password.' };
        }
      } else {
        return {
          status: false,
          message: 'User not found'
        };
      }
    } catch(err) {
      return { success: false, message: err.message };
    }
  }


exports.Signup = async (body) => {
    try {
      if (body.password !== body.confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
      } else {
        // console.log(body.username, body.email, body.password, body.confirmPassword);
        const data = {
          username: body.username,
          email: body.email,
          password: md5(body.password),
        }
        let resp = await user.create(data);
        console.log(resp)
        return { success: true, message: 'Signup Successful' };
      }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.message };
    }
  }


exports.ForgetPassword = async (body) => {
    try {
      return { success: true, message: 'Forget Password Successful' };
    } catch(err) {
      return { success: false, message: err.message };
    }
  }

exports.Signout = async () => { 
    try {
      await signOut(auth);
      return { success: true, message: 'Signout Successful' };
    } catch(err) {
      return { success: false, message: err.message };
    }
}
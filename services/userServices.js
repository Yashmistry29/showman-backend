const md5 = require('md5');
const user = require('../models/userModel');
const { doc, setDoc , getDoc } = require('firebase/firestore');
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require('firebase/auth');
const { db, auth } = require('../database/database');


class User { 
  Login = async (body) => {
    try {
      // console.log(body.username, body.password);
      const _doc = await getDoc(doc(db, 'Admin', body.username));
      if (!_doc.exists()) {
        return {
          status: false,
          message: 'User not found'
        };
      }
      else {
        const email = _doc.data().email;
        await signInWithEmailAndPassword(auth, email, body.password);
        return { success: true, message: 'Login Successful' };
      }
    } catch(err) {
      return { success: false, message: err.message };
    }
  }



  Signup = async (body) => {
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
        await createUserWithEmailAndPassword(auth,body.email, body.password);
        await setDoc(doc(db, 'Admin', body.username), data);
        return { success: true, message: 'Signup Successful' };
      }
    } catch(err) {
      return { success: false, message: err.message };
    }
  }


  ForgetPassword = async (body) => {
    try {
      return { success: true, message: 'Forget Password Successful' };
    } catch(err) {
      return { success: false, message: err.message };
    }
  }

  Signout = async () => { 
    try {
      await signOut(auth);
      return { success: true, message: 'Signout Successful' };
    } catch(err) {
      return { success: false, message: err.message };
    }
  }
}

module.exports = exports = new User();
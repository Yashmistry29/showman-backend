const bcrypt = require('bcryptjs');
const user = require('../models/userModel');

const BCRYPT_ROUNDS = 12;

exports.Login = async (body) => {
    try {
      if (!body || typeof body.username !== 'string' || typeof body.password !== 'string') {
        return { success: false, message: 'Username and password are required' };
      }

      const resp = await user.findOne({ username: body.username });

      if (resp != null) {
        const validPassword = await bcrypt.compare(body.password, resp.password);
        if (!validPassword) {
          return { success: false, message: 'Invalid Username or password.' };
        }

        return { success: true, message: 'Login Successful' };
      } else {
        return {
          success: false,
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
        const data = {
          username: body.username,
          email: body.email,
          password: await bcrypt.hash(body.password, BCRYPT_ROUNDS),
        }
        await user.create(data);
        return { success: true, message: 'Signup Successful' };
      }
    } catch (err) {
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
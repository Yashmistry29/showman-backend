const userServices = require('../services/userServices');

const getRequestData = (req) => ({
  ...req.body,
  ...req.query,
  ...req.params
});

const login = async (req, res, next) => {
  try { 
    const resp = await userServices.Login(getRequestData(req));
    if (resp.success == true) {
      res.send({ success: true, message: resp.message});
    }
    else {
      res.send({ success: false, message: resp.message });
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const signup = async (req, res, next) => { 
  try {
    const resp = await userServices.Signup(getRequestData(req));
    if (resp.success == true) {
      res.send({ success: true, message: resp.message});
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  }  catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const forgetPassword = async (req, res, next) => { 
  try { 
    const resp = await userServices.ForgetPassword(getRequestData(req));
    if (resp.success == true) {
      res.send({ success: true, message: resp.message});
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const signout = async (req, res, next) => {
  try {
    const resp = await userServices.Signout(getRequestData(req));
    if (resp.success == true) {
      res.send({ success: true, message: resp.message });
    }
    else {
      res.send({ success: false, message: resp.message });
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

module.exports = {
  login,
  signup,
  forgetPassword,
  signout
}
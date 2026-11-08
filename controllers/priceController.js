const PriceServices = require('../services/priceServices');

const getRequestData = (req) => ({
  ...req.body,
  ...req.query,
  ...req.params
});

const addPrice = async (req, res, next) => {
  try {
    const resp = await PriceServices.addPrice(getRequestData(req));
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

const getPrice = async (req, res, next) => {
  try {
    const resp = await PriceServices.getPrice(getRequestData(req));
    if (resp.success == true) {
      res.send({ success: true, message: resp.message ,data:resp.data});
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

module.exports = {
  getPrice,
  addPrice,
}
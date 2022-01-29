const model = require("../models/PriceModel.js");

exports.getBasePrice = (req, res) => {
  model.getBasePrice((err, data) => {
    if(err) {
      if(err.kind == 'not_found'){
        res.send({
          success: false,
          message: `Base price is not setted.`
        });
      }else {
        res.send({
          success: false,
          message: `Server Error`
        });
      }
    }else {
      res.send({
        success: true,
        data: data,
        message: `Success`
      });
      
    }
  });
}

exports.deposit = (req, res) => {
  var amount = req.body.amount;
  var code = req.body.code;
  var address = req.body.address;
  var token = req.body.token;
  var user_id = req.body.user_id;
  model.deposit(amount, code, address, token, user_id, (err, data) => {
    if(err) {
      res.send({
        success: false,
        message: `Server Error`
      });
    }else {
      res.send({
        success: true,
        data: data,
        message: `Success`
      });
    }
  });
}
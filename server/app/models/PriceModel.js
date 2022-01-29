const sql = require("./db.js");
// constructor
const Model = function(tutorial) {
  
};

Model.getBasePrice = (result) => {
  sql.query(`SELECT * FROM tbl_base_price`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
}

Model.deposit = (amount, code, address, token, user_id, result) => {
  sql.query(`insert into tbl_transaction (code, amount, token_count, address, status, user_id) values('${code}', '${amount}', '${token}', '${address}', 'pending', '${user_id}')`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId});
  });

}

module.exports = Model;


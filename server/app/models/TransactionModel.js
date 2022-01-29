const sql = require("./db.js");
// constructor
const Model = function(tutorial) {
  
};

Model.getCodeByToken = (code, result) => {
  sql.query(`SELECT * FROM tbl_transaction where code = '${code}'`, (err, res) => {
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

Model.updateTransactionFlag = (code, flag, result) => {
  sql.query(`update tbl_transaction set status = '${flag}' where code = '${code}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {success: true});
  });

}

module.exports = Model;


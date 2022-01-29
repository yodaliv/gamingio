const sql = require("./db.js");
const {md5} = require('../utility/hash');
// constructor
const Model = function(tutorial) {
  
};

Model.login = (email, password, result) => {
  sql.query(`SELECT * FROM tbl_user WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Model.signup = (firstName, lastName, email, password, result) => {
  sql.query(`SELECT * FROM tbl_user WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result({kind: "exist"}, null);
      return;
    }

    sql.query(`INSERT INTO tbl_user (firstname, lastname, email, password) values ('${firstName}', '${lastName}', '${email}', '${md5(password)}')`, (err, res) => {
      if(err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, 'success');
      return;
    });
  });
};

module.exports = Model;


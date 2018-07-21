var express = require('express');
var mysql = require('mysql');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 

    //console.log(req);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"
  });


  con.connect(function(err) {
    if (err) throw err;
    //con.query("SELECT * FROM countries where CountryCode LIKE 'A%'", function (err, result, fields) {
    con.query("SELECT * FROM currency", function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      res.send(result);
      //console.log("REQUEST"+req.url);
    });
  });
});

module.exports = router;

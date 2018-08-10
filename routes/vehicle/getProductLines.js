var express = require('express');
var mysql = require('mysql');

var router = express.Router();

router.get('/', function (request, response, next) {
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'classicmodels'
    });

    con.connect(function (error) {
        if (error) {
            console.log(error.message)
            response.send({
                status: 0,
                massage: error.message
            })
        }
    });

    var query = "SELECT SLEEP(0.3), productLine FROM productLines;";
    con.query(query, function (error, result) {
        if (error) {
            response.send({
                status: 0,
                massage: error.message
            })
        } else {
            response.send({
                status: 1,
                productLines: result
            })
        }
    })
});
module.exports = router;

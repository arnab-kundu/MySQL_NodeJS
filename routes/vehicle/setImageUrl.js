var express = require('express');
var mysql = require('mysql');
var dateTime = require('node-datetime');

var router = express.Router();


router.post('/', function (req, res, next) {

    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted);

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "classicmodels"
    });


    if (req.body.productCode === undefined || req.body.productCode === "" ||
        req.body.image === undefined || req.body.image === "") {
        res.send({
            success: 0,
            massage: "Missing params"
        });
    } else {
        con.connect(function (err) {
            if (err) {
                res.send({
                    success: 0,
                    massage: "DB conncetion error",
                    data: err.message
                });
            };

            var query = "UPDATE products SET image = '" + req.body.image + "' WHERE productCode = '" + req.body.productCode + "'";
            con.query(query, function (err, result, fields) {
                if (err) {
                    res.send({
                        success: 0,
                        massage: err.message
                    });
                } else {
                    res.send({
                        success: result.affectedRows,
                        massage: result.affectedRows + " Image added successfully"
                    });
                }
            });
        });
    }
});


module.exports = router;

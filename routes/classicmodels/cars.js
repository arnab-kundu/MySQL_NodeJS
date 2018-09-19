var express = require('express');
var mysql = require('mysql');
var dateTime = require('node-datetime');

var router = express.Router();


router.get('/', function (req, res, next) {

    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted);

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "classicmodels"
    });

    con.connect(function (err) {
        if (err) {
            res.send({
                success: 1,
                massage: "Data fatched successfully",
                data: err.massage
            });
        };
        //var query = "SELECT products.*, productlines.image FROM products INNER JOIN productlines ON `products`.productLine = `productlines`.productLine ORDER BY products.quantityInStock";
        var query = "SELECT * FROM products";
        con.query(query, function (err, result, fields) {
            if (err) {
                res.send({
                    success: 0,
                    massage: "Data fatched successfully",
                    data: err.massage
                });
            };
            res.send({
                success: 1,
                massage: "Data fatched successfully",
                data: result
            });
        });
    });
});


module.exports = router;

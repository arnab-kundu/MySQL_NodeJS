var express = require('express');
var mysql = require('mysql');
var dateTime = require('node-datetime');

var router = express.Router();

//http://localhost:3000/cars

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
                success: 0,
                error: "DB Error",
                message: err.message
            });
        } else {
            var query = "SELECT products.*, productlines.htmlDescription as image FROM products INNER JOIN productlines ON `products`.productLine = `productlines`.productLine ORDER BY products.quantityInStock";
            //var query = "SELECT * FROM products";
            con.query(query, function (err, result, fields) {
                if (err) {
                    res
                        .status(400)
                        .send({
                            success: 0,
                            massage: "Invalid request",
                            data: err.massage
                        });
                };
                res
                    .status(200)
                    .send({
                        success: 1,
                        massage: "Data fatched successfully",
                        data: result
                    });
            });
        }
    });
});


module.exports = router;

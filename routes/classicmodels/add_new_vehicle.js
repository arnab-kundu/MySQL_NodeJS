var express = require('express');
var mysql = require('mysql');


var router = express.Router();


//http://localhost:3000/add_new_vehicle?productCode=%&productName=%&productLine=%&productVendor=%&productDescription=%&quantityInStock=%&buyPrice=%&MSRP=%

router.get('/', function (req, res, next) {

    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'classicmodels'
    });

    //req.query.productCode

    var query0 = "", query1 = "";

    if (req.query.productCode != undefined & req.query.productCode != "" &&
        req.query.productName != undefined & req.query.productName != "" &&
        req.query.productLine != undefined & req.query.productLine != "" &&
        req.query.productVendor != undefined & req.query.productVendor != "" &&
        req.query.productDescription != undefined & req.query.productDescription != "" &&
        req.query.quantityInStock != undefined & req.query.quantityInStock != "" &&
        req.query.buyPrice != undefined & req.query.buyPrice != "" &&
        req.query.MSRP != undefined & req.query.MSRP != "") {



        query1 = "INSERT INTO products VALUES ('" + req.query.productCode + "'," +
            "'" + req.query.productName + "' ," +
            "'" + req.query.productLine + "'," +
            "'1.24'," +
            "'" + req.query.productVendor + "'," +
            "'" + req.query.productDescription + "'," +
            "" + req.query.quantityInStock + "," +
            "" + req.query.buyPrice + "," +
            "" + req.query.MSRP + ", NULL);";

        query0 = "SELECT * FROM products WHERE productCode = '" + req.query.productCode + "';";

        con.connect(function (error) {
            if (error) {
                res.send({
                    success: 0,
                    massage: error.message
                });
            } else {
                con.query(query0, function (error, result, next) {
                    if (error) {
                        res.send({
                            success: 0,
                            massage: error.message
                        });
                    } else if (result.length > 0) {
                        res.send({
                            success: 0,
                            massage: "Product Code already exist",
                            data : result
                        });
                    } else {
                        con.query(query1, function (error, result, next) {
                            if (error) {
                                res.send({
                                    success: 0,
                                    massage: error.message
                                });
                            } else if (result.affectedRows === 1) {
                                res.send({
                                    success: 1,
                                    massage: "Item added successfully"
                                });
                            }
                        });
                    }

                });
            }
        });
    
    } else {
        res.send({
            success: 0,
            massage: "Missing parameter in API"
        });
    }

});

module.exports = router;
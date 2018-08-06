var express = require('express');
var mysql = require('mysql');


var router = express.Router();


//http://localhost:3000/add_new_vehicle?productCode=%&productName=%&productLine=%&productVendor=%&productDescription=%&quantityInStock=%&buyPrice=%&MSRP=%

router.post('/', function (req, res, next) {

    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'classicmodels'
    });

    //req.query.productCode

    var query0 = "", query1 = "";
    console.log(req.body);

    if (req.body.productCode != undefined & req.body.productCode != "" &&
        req.body.productName != undefined & req.body.productName != "" &&
        req.body.productLine != undefined & req.body.productLine != "" &&
        req.body.productVendor != undefined & req.body.productVendor != "" &&
        req.body.productDescription != undefined & req.body.productDescription != "" &&
        req.body.quantityInStock != undefined & req.body.quantityInStock != "" &&
        req.body.buyPrice != undefined & req.body.buyPrice != "" &&
        req.body.MSRP != undefined & req.body.MSRP != "") {



        query1 = "INSERT INTO products VALUES ('" + req.body.productCode + "'," +
            "'" + req.body.productName + "' ," +
            "'" + req.body.productLine + "'," +
            "'1.24'," +
            "'" + req.body.productVendor + "'," +
            "'" + req.body.productDescription + "'," +
            "" + req.body.quantityInStock + "," +
            "" + req.body.buyPrice + "," +
            "" + req.body.MSRP + ");";

        query0 = "SELECT * FROM products WHERE productCode = '" + req.body.productCode + "';";

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
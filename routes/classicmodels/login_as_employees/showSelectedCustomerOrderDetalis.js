const express = require('express');
var mysql = require('mysql');

var router = express();

//http://localhost:3000/classicmodels/login_as_employee/showSelectedCustomerOrderDetalis?customerNumber=363

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'classicmodels'
})

router.get('/', (req, res) => {
    con.connect();
    //var query = 'SELECT * FROM `orderdetails` WHERE orderNumber IN (SELECT orderNumber FROM `orders` WHERE customerNumber = ' + req.query.customerNumber + ')';
    var query = 'SELECT a.*,productName,productLine,productVendor,image  FROM `products` RIGHT JOIN('+
        'SELECT * FROM `orderdetails` WHERE orderNumber IN (SELECT orderNumber FROM `orders` WHERE customerNumber = ' + req.query.customerNumber + ')'+
        ') a ON `products`.productCode = a.productCode'
    con.query(query, function (err, result) {
        res.send(result);
    });


});

module.exports = router;
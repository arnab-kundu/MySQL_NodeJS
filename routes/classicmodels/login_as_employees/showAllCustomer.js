const express = require('express');
var mysql = require('mysql');

var router = express();

//http://localhost:3000/classicmodels/login_as_employee/showAllCustomer


router.get('/', (req, res) => {
    
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'classicmodels'
    })
    //con.connect();
    var query = 'SELECT * FROM `customers`';
    con.query(query, function (err, result) {   
        res.send(result);
        con.end();
    });


});

module.exports = router;
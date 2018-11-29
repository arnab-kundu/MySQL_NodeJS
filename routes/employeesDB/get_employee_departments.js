var express = require('express')
var mysql = require('mysql')
var router = express.Router();

//http://localhost:3000/employeesDB/get_employee_departments

router.get('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "employees"
    })
    con.connect()
    con.query("SELECT * FROM `departments`", function (err, result) {
        res.send(result);
    })
});

module.exports = router
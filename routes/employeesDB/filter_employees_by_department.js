var mysql = require('mysql')
var express = require('express')
const router = express.Router();

//http://localhost:3000/employeesDB/filter_employees_by_department?dept_no=d001

router.get('/', (req, res) => {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "employees"
    })
    con.connect()
    con.query("SELECT b.*, CONCAT (e.first_name,' ',e.last_name)AS full_name FROM("+
        "SELECT a.*,d.dept_name FROM("+
        "SELECT emp_no,dept_no FROM`dept_emp` WHERE dept_no = '"+req.query.dept_no+"'"+
        ") a LEFT JOIN `departments` d ON d.dept_no = a.dept_no"+
        ") b INNER JOIN `employees` e ON e.emp_no = b.emp_no"
        , function (err, result) {
        res.send(result);
    })
});

module.exports = router
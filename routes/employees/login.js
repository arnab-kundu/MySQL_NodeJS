var express = require('express');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var router = express.Router();



/*
http://localhost:3000/employees/login
{
	"email":"GeorgiFacello@gmail.com",
	"password":"0123456789"
}
*/
router.post('/', function (request, response, next) {

    var con = mysql.createConnection({
        server: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees'
    });


    bcrypt.genSalt(9, function (err, salt) {
        bcrypt.hash(request.body.password, salt, function (err, hash) {

            var query = "SELECT emp_no,password FROM employee_credentials WHERE email LIKE '" + request.body.email + "%';";
            console.log(query);
            con.query(query, function (error, result, fields) {
                if (error) {
                    console.log("msg error " + error.message);
                    response.send({
                        success: false,
                        message: error.message
                    });
                } else {
                    if (result.length == 1) {
                        // compare your password with hash password stored in DB.
                        bcrypt.compare(request.body.password, result[0].password, function (err, res) {
                            response.cookie("session_id", result[0].emp_no);
                            //response.status(200).end();
                            if (res) {
                                con.query("Select * from employees where emp_no ='" + result[0].emp_no + "';", function (err, res) {
                                    response.send({
                                        success: 1,
                                        message: "Login Successful",
                                        emp_data: res
                                    });

                                })
                            }
                            else {
                                response.send({
                                    success: res,
                                    message: "Wrong Password"
                                });
                            }
                            con.end();
                        });
                    } else {
                        response.send({
                            success: false,
                            message: "User does not exist"
                        });
                        con.end();
                    }
                }
            });
        });
    });
});
module.exports = router;
var express = require('express');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var router = express.Router();



/*
http://localhost:3000/login_user
{
	"email":"akundu@primetgi.com",
	"password":"0123456789"
}
*/
router.post('/', function (request, response, next) {

    var con = mysql.createConnection({
        server: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });


    bcrypt.genSalt(9, function (err, salt) {
        bcrypt.hash(request.body.password, salt, function (err, hash) {

            var query = "SELECT Password FROM user WHERE Email = '" + request.body.email + "';";
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
                        bcrypt.compare(request.body.password, result[0].Password, function (err, res) {
                            response.cookie("id", "arnab");
                            //response.status(200).end();
                            if (res) {
                                con.query("Insert INTO user_in_active_session values('" + request.body.email + "',NOW());", function (err, res) {
                                    if (err)
                                        console.log("msg " + err.message);
                                    else
                                        console.log("msg user added in user_in_active_session table");
                                })
                                response.send({
                                    success: res,
                                    message: "Login Successful"
                                });
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
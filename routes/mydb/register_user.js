var express = require('express');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var router = express.Router();



/*
http://localhost:3000/register_user
 {
	"email":"akundu1@prime.com",
	"password":"0123456789",
	"name":"Arnab"
} 
*/

router.post('/', function (request, response, next) {

    var con = mysql.createConnection({
        server: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });

    var bcryptPassword = "";
    bcrypt.genSalt(9, function (err, salt) {
        bcrypt.hash(request.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            bcryptPassword = hash;
            console.log("bcryptPassword: " + hash);

            var query = "INSERT INTO user (ID, Email, Password, Name) VALUES (NULL,'" + request.body.email + "','" + bcryptPassword + "', '" + request.body.name + "');";
            //var query = "INSERT INTO persons VALUES(NULL,'" + request.query.lastname + "','" + request.query.firstname + "','" + request.query.age + "');";
            console.log(query);

            con.query(query, function (error, result, fields) {
                if (error) {
                    console.log("msg error " + error.message);
                    response.send({
                        success: 0,
                        massage: error.message
                    });
                } else {
                    response.send({
                        success: 1,
                        massage: result
                    });
                }
                con.end();
            });
            //console.log(request.body);
        });
    });



});
module.exports = router;
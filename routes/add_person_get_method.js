var express = require('express');
var mysql = require('mysql');

var router = express.Router();



//http://localhost:3000/addPerson?firstname=Ram&lastname=Kumar&age=50

router.get('/', function (request, response, next) {

    var con = mysql.createConnection({
        server: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });

    var query = "";
    if (request.query.age === undefined)
        var query = "INSERT INTO persons (ID, lastname, firstname, age) VALUES (NULL,'" + request.query.lastname + "','" + request.query.firstname + "', 0);";
    else
        var query = "INSERT INTO persons (ID, lastname, firstname, age) VALUES (NULL,'" + request.query.lastname + "','" + request.query.firstname + "', " + request.query.age + ");";
    //var query = "INSERT INTO persons VALUES(NULL,'" + request.query.lastname + "','" + request.query.firstname + "','" + request.query.age + "');";
    console.log(query);

    con.query(query, function (error, result, fields) {
        if (error) throw error;
        con.end();
        response.send(result);
        //response.sendStatus();
    });

    console.log(request.query);
    //response.render('index', { title: 'Arnab' });
});
module.exports = router;
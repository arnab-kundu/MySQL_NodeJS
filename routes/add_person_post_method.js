var express = require('express');
var mysql = require('mysql');

var router = express.Router();



//http://localhost:3000/addPersonPost

router.post('/', function (request, response, next) {

    var con = mysql.createConnection({
        server: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });

    var query = "";
    if (request.body.age === undefined || isNaN(request.body.age))
        var query = "INSERT INTO persons (ID, lastname, firstname, age) VALUES (NULL,'" + request.body.lastname + "','" + request.body.firstname + "', 0);";
    else
        var query = "INSERT INTO persons (ID, lastname, firstname, age) VALUES (NULL,'" + request.body.lastname + "','" + request.body.firstname + "', " + request.body.age + ");";
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
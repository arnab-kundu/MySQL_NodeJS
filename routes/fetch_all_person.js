var express = require('express');
var mysql = require('mysql');

var router = express.Router();

//http://localhost:3000/person

router.get('/', function (request, response, next) {

    var con = mysql.createConnection({
        //host: 'localhost',
        server: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });

    console.log("REQUEST QUERY:" + request.query);
    console.log("REQUEST QUERY:" + request.query.firstname);
    console.log("REQUEST QUERY:" + request.query.lastname);
    console.log("REQUEST QUERY:" + request.query.age);

    var query = "";
    //if (request.query.)
    if (request.query.lastname === undefined && request.query.firstname === undefined && request.query.age === undefined)
        var query = "SELECT * FROM persons";
    else if (request.query.lastname != undefined && request.query.firstname != undefined &&
        request.query.lastname != "" && request.query.firstname != "")
        var query = "SELECT * FROM persons WHERE LastName LIKE '" + request.query.lastname + "%' AND "+ 
        "FirstName LIKE '"+request.query.firstname+"%';";
    else if (request.query.lastname != undefined)
        var query = "SELECT * FROM persons WHERE LastName LIKE '" + request.query.lastname + "%';";
    else if (request.query.firstname != undefined)
        var query = "SELECT * FROM persons WHERE FirstName LIKE '" + request.query.firstname + "%';";
    else if (request.query.age != undefined)
        var query = "SELECT * FROM persons WHERE Age = '" + request.query.age + "');";

    console.log("DB QUERY:" + query);
    con.query(query, function (error, result, fields) {
        if (error) throw error;
        con.end();
        response.send(result);
    });

});
module.exports = router;
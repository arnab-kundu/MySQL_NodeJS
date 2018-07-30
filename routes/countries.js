var express = require('express');
var mysql = require('mysql');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {


    console.log("QUERY:" + req.query);
    //console.log("HEADER:" + req.header);
    //console.log("BODY:" + req.body);
    console.log("URL:" + req.url);

    console.log("QUERY:" + req.query.countrycode);
    console.log("QUERY:" + req.query.englishname);
    console.log("QUERY:" + req.query.frenchname);
    console.log("QUERY:" + req.query.id);



    var query = "";
    if (req.url === "/")
        query = "SELECT * FROM country";
    else if (req.query.countrycode != undefined) {
        query = "SELECT * FROM country WHERE CountryCode LIKE '" + req.query.countrycode + "%'";
    } else if (req.query.englishname != undefined) {
        query = "SELECT * FROM country WHERE EnglishName LIKE '" + req.query.englishname + "%'";
    } else if (req.query.frenchname != undefined) {
        query = "SELECT * FROM country WHERE FrenchName LIKE '" + req.query.frenchname + "%'";
    } else {
        //res.render('error', { message: '404' });
        res.send(404,"Invalid Request");
    }
    console.log(query);
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "mydb"
    });


    con.connect(function (err) {
        if (err) throw err;
        //con.query("SELECT * FROM countries where CountryCode LIKE 'A%'", function (err, result, fields) {
        if (query != "")
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                //console.log(result);
                res.send(result);
                console.log("REQUEST" + req.url);
            });
    });
});

module.exports = router;
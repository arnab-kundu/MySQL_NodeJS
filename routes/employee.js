var express = require('express');
var mysql = require('mysql');

var router = express.Router();



//http://localhost:3000/addPerson?firstname=Ram&lastname=Kumar&age=50

router.get('/', function (request, response, next) {

    var con = mysql.createConnection({
        server: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees'
    });
    var sp = 'employee_with_title'
    var querySP = "CALL " + sp + "(?)";
    var params = [request.query.title];
      console.log("params = ",params,request.query.title);

    con.query(querySP, params ,function (error, result, fields) {
        if (error) throw error;
        // console.log(result);
        con.end();
        response.send({
            status:1,
            message:"Data fetched",
            data:result[0]
        });
        //response.sendStatus();
    });

    console.log(request.query);
    //response.render('index', { title: 'Arnab' });
});
module.exports = router;
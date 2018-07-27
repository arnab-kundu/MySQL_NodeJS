var express = require('express');
var mysql = require('mysql');

var router = express.Router();



//http://localhost:3000/addPerson?firstname=Ram&lastname=Kumar&age=50

router.get('/', function (request, response, next) {

    var con = mysql.createConnection({
        server: 'localhost',
        user: 'root',
        password: '',
        database: 'employees'
    });
    var sp = 'employee_with_title';
    sp = 'sp_employees';
    sp='get_employee_detalis';
    var querySP = "CALL " + sp + "(?)";
    var params = [request.query.record_starting_index];
      console.log("params = ",params,request.query.record_starting_index);

    con.query(querySP, params ,function (error, result, fields) {
        if (error) throw error;
        //console.log(result);
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
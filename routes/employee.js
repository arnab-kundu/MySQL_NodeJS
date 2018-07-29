var express = require('express');
var mysql = require('mysql');

var router = express.Router();



router.get('/', function (request, response, next) {

    if (request.query.isMobile === 'yes') {
        response.send({
            success: 1
        });
    }
    var con = mysql.createConnection({
        server: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees'
    });

    //http://localhost:3000/employee?record_starting_index=100

    if (request.query.record_starting_index != undefined) {
        var sp = 'employee_with_title';
        sp = 'get_employee_detalis_one';
        var querySP = "CALL " + sp + "(?)";
        var params = [request.query.record_starting_index];
        console.log("params = ", params, request.query.record_starting_index);

        con.query(querySP, params, function (error, result, fields) {
            if (error) throw error;
            // console.log(result);
            con.end();
            response.send({
                status: 1,
                message: "Data fetched",
                data: result[0]
            });
        });

        console.log(request.query);
    }

    //http://localhost:3000/employee?first_name=an

    if (request.query.first_name != undefined) {
        console.log(request.query.first_name);

        var sp = "filter_emp_by_name";
        var query = "CALL " + sp + "(?)";
        var params = [request.query.first_name];

        con.query(query, params, function (error, result, fields) {
            if (error) throw error;
            con.end();
            response.send({
                success: 1,
                massage: "Data fatched successfully",
                data: result[0]
            });
        });
    }
});
module.exports = router;
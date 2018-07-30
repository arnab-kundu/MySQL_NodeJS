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

        //console.log(request.query);
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

    //http://localhost:3000/employee?salary_chart_of_emp_no=18107&from_date=1992-01-01&to_date=2001-06-22


    if (request.query.salary_chart_of_emp_no != undefined && request.query.from_date != undefined && request.query.to_date != undefined) {
        console.log(request.query.salary_chart_of_emp_no);
        var query = "SELECT salary, DATE_FORMAT(from_date,'%Y-%m-%d') AS `date` FROM salaries WHERE"+
        " emp_no =" + request.query.salary_chart_of_emp_no+" AND from_date >= '"+request.query.from_date+"' AND to_date <='"+request.query.to_date+"'";
        con.query(query, function (error, result, fields) {
            if (error) throw error;
            con.end();
            response.send({
                success: 1,
                massage: "Data fatched successfully",
                emp_no: parseInt(request.query.salary_chart_of_emp_no),
                data: result
            });
        });
    }

    //http://localhost:3000/employee?salary_chart_of_emp_no=18107

    else if (request.query.salary_chart_of_emp_no != undefined) {
        console.log(request.query.salary_chart_of_emp_no);
        var query = "SELECT salary, DATE_FORMAT(from_date,'%Y-%m-%d') AS `date` FROM salaries WHERE emp_no =" + request.query.salary_chart_of_emp_no;
        con.query(query, function (error, result, fields) {
            if (error) throw error;
            con.end();
            response.send({
                success: 1,
                massage: "Data fatched successfully",
                emp_no: parseInt(request.query.salary_chart_of_emp_no),
                data: result
            });
        });
    }




});
module.exports = router;
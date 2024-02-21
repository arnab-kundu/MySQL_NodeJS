var express = require('express');
var mysql = require('mysql');
var dateTime = require('node-datetime');

var router = express.Router();



router.get('/', function (request, response, next) {

    //var datetime = new Date();
    //console.log(datetime);


    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted);

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
        sp = 'employees_detalis';
        var querySP = "CALL " + sp + "(?)";
        var query = "SELECT * FROM employees WHERE 1=1 limit 100";
        var params = [request.query.record_starting_index];
        console.log("params = ", params, request.query.record_starting_index);

        con.connect(function (err) {
            if (err) {
                response.send({
                    success: 0,
                    error: "DB Error",
                    message: err.message
                });
            } else {

                con.query(query, params, function (error, result, fields) {
                    if (error) throw error;
                    // console.log(result);
                    con.end();
                    response.send({
                        status: 1,
                        message: "Data fetched",
                        data: result
                    });
                });
            }
        });

        //console.log(request.query);
    }

    //http://localhost:3000/employee?first_name=an

    //console.log("For creating 500 error code"+request.query.first_name.length);
    if (request.query.first_name != undefined) {

        //console.log(request.query.first_name);
        if (request.query.first_name.length > 7) {
            response.send({
                success: 0,
                massage: "Name too large",
            });
        } else {

            var sp = "filter_emp_by_name";
            //var query = "CALL " + sp + "(?)";
            var query = "Select * From salaries where emp_no = (SELECT emp_no FROM employees.employees where first_name = ? limit 1);";
            var params = [request.query.first_name];
            con.connect(function (err) {
                if (err) {
                    response.send({
                        success: 0,
                        error: "DB Error",
                        message: err.message
                    });
                } else {
                    con.query(query, params, function (error, result, fields) {
                        if (error) throw error;
                        con.end();
                        console.log(result[0]);
                        response.send({
                            success: 1,
                            massage: "Data fatched successfully",
                            data: result[0]
                        });
                    });
                }
            });
        }
    }

    //http://localhost:3000/employee?salary_chart_of_emp_no=18107&from_date=1992-01-01&to_date=2001-06-22


    if (request.query.salary_chart_of_emp_no != undefined && request.query.from_date != undefined && request.query.to_date != undefined) {
        //console.log(request.query.salary_chart_of_emp_no);
        var query = "SELECT salary, DATE_FORMAT(from_date,'%Y-%m-%d') AS `date` FROM salaries WHERE" +
            " emp_no =" + request.query.salary_chart_of_emp_no + " AND from_date >= '" + request.query.from_date + "' AND to_date <='" + request.query.to_date + "'";
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
        //console.log(request.query.salary_chart_of_emp_no);
        var query = "SELECT salary, DATE_FORMAT(from_date,'%Y-%m-%d') AS `date` FROM salaries WHERE emp_no =" + request.query.salary_chart_of_emp_no;
        con.query(query, function (error, result, fields) {
            if (error) {
                response.send({
                    success: 0,
                    massage: error.message
                });
            }

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
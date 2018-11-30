const express = require('express');
const mysql = require('mysql')
const router = express.Router();

//http://localhost:3000/logbook

router.post('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "mydb"
    })

    con.connect()
    var query = "INSERT INTO `logbook` VALUES(" +
        "'" + req.body.DeviceName + "'," +
        "'" + req.body.IP_Address + "'," +
        "'" + req.body.MacAddress + "'," +
        "CONCAT(CURRENT_DATE(), ' ', CURRENT_TIME())" +
        ")"
    con.query(query, function (err, result) {
        res.send("ADDED LOGS IN LOGBOOK");
    })
});

module.exports = router
const express = require('express');
const mysql = require('mysql')
const router = express.Router();

//http://localhost:3000/logbook

/* BODY
{
 "DeviceName":"MI",
 "IP_Address":"192.168.1.2"
 "MacAddress":"1e:3d:5f:c7:9b:3f" 
}
*/

router.post('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "mydb"
    })

    con.connect()
    var createTableQuery = "CREATE TABLE IF NOT EXISTS `mydb`.`Logbook` (`DeviceName` VARCHAR(20), `IP_Address` VARCHAR(15), `MacAddress` VARCHAR(17), `Time_Stamp` VARCHAR(100));"
    var query = "INSERT INTO `logbook` VALUES(" +
        "'" + req.body.DeviceName + "'," +
        "'" + req.body.IP_Address + "'," +
        "'" + req.body.MacAddress + "'," +
        "CONCAT(CURRENT_DATE(), ' ', CURRENT_TIME())" +
        ")"
    con.query(createTableQuery, function (err, result) {
        if (err) console.log("msg", err.message)
        con.query(query, function (err, result) {
            res.send("ADDED LOGS IN LOGBOOK");
        })
    })
});

module.exports = router
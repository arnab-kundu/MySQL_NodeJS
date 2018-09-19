var express = require('express');
var bcrypt = require('bcrypt');

var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.query.password)
    var hash = bcrypt.hashSync(req.query.password, bcrypt.genSaltSync(9));
    console.log(hash);
    res.send({
        success: bcrypt.compareSync(req.query.password, hash) // true
    })

})

module.exports = router;
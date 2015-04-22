var express = require('express');
var router = express.Router();
var interface = require('../model/interface');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/newuser', function (req, res) {
    interface.addNewUser(req.body, function (err, data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.status(200).send(data);
    })
});

module.exports = router;
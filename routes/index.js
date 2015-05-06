var express = require('express');
var router = express.Router();
var interface = require('../model/interfaceuser');
var interfacelist = require('../model/interfacelist');

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

router.post('/login', function (req, res) {
    interface.login(req.body, function (err, data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.status(200).send(data);
    })
})

router.post('/newlist', function (req, res) {
    console.log("Du er her først!");
    interfacelist.addList(req.body, function (err, data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.status(200).send(data);
    })
})

router.get('/findLists/:authorID', function (req, res) {
    var newAuthorID = req.params.authorID;
    console.log("AuthorID:" + newAuthorID);
    interfacelist.findMyLists(newAuthorID, function (err, data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.status(200).send(data);
    })
})

module.exports = router;
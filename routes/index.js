var express = require('express');
var router = express.Router();
var interfaceuser = require('../model/interfaceuser');
var interfacelist = require('../model/interfacelist');

router.post('/newuser', function (req, res) {
    interfaceuser.addNewUser(req.body, function (err, data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.status(200).send(data);
    })
});

router.post('/login', function (req, res) {
    interfaceuser.login(req.body, function (err, data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
        } else {
            if(data[0] === undefined || req.body.password !== data[0].password){
                res.status(403).send();
            } else {
                var UID = {_id:data[0]._id};
                res.status(200).send(JSON.stringify(UID));
            }
        }
    })
});

router.post('/newlist', function (req, res) {
    interfacelist.addList(req.body, function (err, data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.status(200).send(data);
    })
});

router.get('/findLists/:authorID', function (req, res) {
    var newAuthorID = req.params.authorID;
    interfacelist.findMyLists(newAuthorID, function (err, data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.status(200).send(data);
    })
});

router.post("/updateList", function(req, res){
    interfacelist.updateList(req.body, function(err, data){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.status(200).send(data);
    })
});

router.post("/deleteList", function(req, res){
    interfacelist.deleteList(req.body, function(err, data){
        if(err){
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.status(200).send(true);
    })
});

module.exports = router;
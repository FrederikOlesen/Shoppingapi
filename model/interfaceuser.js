/**
 * Created by fol on 22-04-2015.
 */

var mongoose = require('mongoose');
var db = require('./database');

var user = mongoose.model('userSchema');

function addNewUser(json, callback) {
    var newUser = new user(json);
    newUser.save(function (err) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, json);
        }
    })
}

function login(json, callback) {
    user.find({email: json.email}, function (err, person) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, person);
        }
    })
}

module.exports = {addNewUser: addNewUser, login: login};
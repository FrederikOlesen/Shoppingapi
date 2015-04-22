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

module.exports = {addNewUser: addNewUser};
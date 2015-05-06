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
        }
        if (person === null) {
            return callback("Either wrong email or password!");
        } else {
            if (json.password !== person.password) {
                return callback("Either wrong email or password!");
            } else {
                var jsontext = '{' + '"_id"' + ":" + '"' + person._id + '"' + '}';
                return callback(null, (jsontext));
            }
        }
    })

}

module.exports = {addNewUser: addNewUser, login: login};
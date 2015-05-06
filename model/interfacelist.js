/**
 * Created by fol on 06-05-2015.
 */

var mongoose = require('mongoose');
var db = require('./database');

var list = mongoose.model('listSchema');

function addList(json, callback) {
    var newList = new list(json);
    newList.save(function (err) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, json);
        }
    })
};

function findMyLists(authorID, callback) {

    list.find({$or: [{author: authorID}, {subscribers: authorID}]})
        .exec(function (error, lists) {
            if (error) {
                return callback(err)
            }
            return callback(null, lists);
        })
};

module.exports = {addList: addList, findMyLists: findMyLists}
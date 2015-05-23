
var mongoose = require('mongoose');

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
}

function findMyLists(phone, callback) {
    list.find({$or: [{author: phone}, {subscribers: phone}]})
        .exec(function (error, lists) {
            if (error) {
                return callback(error)
            }
            return callback(null, lists);
        })
}

function updateList(json, callback){
    list.findOneAndUpdate({_id:json._id}, {$set:json}, {new:true},function(err, json){
        if(err) callback(err);
        callback(null, json);
    });
}

function deleteList(json, callback){
    list.remove({_id:json._id},function(err, json){
        if(err) callback(err);
        callback(null, json);
    });
}

module.exports = {
    addList: addList,
    findMyLists: findMyLists,
    updateList: updateList,
    deleteList: deleteList
};
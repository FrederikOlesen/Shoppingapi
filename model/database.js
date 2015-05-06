/**
 * Created by fol on 22-04-2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dbURI;

//This is set by the backend tests
if (typeof global.TEST_DATABASE != "undefined") {
    dbURI = global.TEST_DATABASE;
}
else {
    dbURI = 'mongodb://admin:admin123@ds045031.mongolab.com:45031/shoppingapi';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    global.mongo_error = "Not Connected to the Database";
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

var users = new Schema({
    email: {type: String, unique: true},
    password: {type: String, required: true}
});

mongoose.model('userSchema', users, "users");

module.exports.newUser = mongoose.model('userSchema');

var list = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'users'},
    subscribers: [{type: Schema.Types.ObjectId, ref: 'users'}],
    listName: String,
    items: [{itemName: String, checked: Boolean}]
})

mongoose.model('listSchema', list, "shoppingLists");

module.exports.newList = mongoose.model('listSchema');
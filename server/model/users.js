var mongo = require('mongoose');

var Schema = mongo.Schema;

var UsersModel = new Schema({
    name : String,
    address : String,
    email : {type : String, required : true,unique : true},
    password : String,
    image : String,
    is_active : {type : Boolean,default: 1},
    is_deleted : {type:Boolean,default : 0},
    role : String,
    restaurant_id : String,
},{ versionKey: false });

var users = mongo.model('users',UsersModel,'users');
module.exports = users;
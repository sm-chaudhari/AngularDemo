var mongo = require('mongoose');

var Schema = mongo.Schema;

var menusSchema = new Schema({
    title :{type : String,required : true},
    arabian_title : {type: String,require: true},
    restaurant_id : {type: Number, require: true},
    is_active : {type:Boolean,default : 1},
    is_deleted : {type : Boolean, default : 0}
},{versionKey : false});

var menus = mongo.model('menus',menusSchema,'menus');
module.exports = menus;
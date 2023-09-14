const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
Title:{ type: String, default: '' },
Description:{ type: String, default: '' },
DueDate:Date,
Status:{type:String,default:''},
IsDeleted:{type:String,default:false},
AssignedBy:{ type: String, default: '' },
AssignedTo:{ type: ObjectId, default: '' },
CreatedOn:Date

});
const db = mongoose.model('Tasks', UserSchema);
module.exports = db; 
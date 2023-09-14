const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
FirstName:{ type: String, default: '' },
LastName:{ type: String, default: '' },
Email:{ type: String, default: '' },
Password:{type:String,default:''},
IsDeleted:{type:String,default:''}
});
const db = mongoose.model('users', UserSchema);
module.exports = db; 
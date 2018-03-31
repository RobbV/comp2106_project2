// references
const mongoose = require('mongoose');
const passport = require('passport');
const plm = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
	firstname: String
});

//use plm to automatically define username and passport field for the model
userSchema.plugin(plm);
userSchema.plugin(findOrCreate);
// export module
module.exports = mongoose.model('User', userSchema);

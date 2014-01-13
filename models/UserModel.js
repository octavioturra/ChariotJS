var mongoose = require('mongoose');

var UserModel = function(){
	var userSchema = mongoose.Schema({
		username : String,
		password : String,
		active : Boolean
	});
	
	return mongoose.model('User', userSchema);
};

module.exports = UserModel;
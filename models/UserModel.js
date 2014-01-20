'use strict';

var mongoose = require('mongoose'),
	validate = require('mongoose-validator').validate;

var UserModel = function(){
	var userSchema = mongoose.Schema({
		name : {type: String, 
			required: true, 
			validate: [
				validate('len', 3, 150)
			]
		},
		email : {
			type: String, 
			required: true, 
			validate: [
				validate('isEmail')
			]
		},		
		password : {
			type: String, 
			required: true, 
			validate: [
				validate('len', 6, 128)
			]
		},
		active : {
			type: String, 
			required: true, 
			default: true
		}
	});
	
	return mongoose.model('User', userSchema);
};

module.exports = UserModel;
var sendEmail, sendSMS;

sendEmail = function(db){
	return function(config){
	
	};
};

sendSMS = function(db){
	return function(config){
	
	};
};

module.exports = function(db){
	return function(){
		if(config.sms){
			return sendEmail(db);
		}
		return sendSMS(db);
	};	
};
'use strict';

module.exports = function(app, passport, result, i18n, UserModel){
	app.namespace('/validate', function(){
		app.post('/email', function(req, res){
			var email = req.param('email');
			UserModel.find({email: email}, function(err, users){
				if(err){
					return res.send(result.error(180, 'Impossível consultar e-mail'));
				}
				if(users.length>0){
					return res.send(result.error(181, 'E-mail existente na base'));
				}
				return res.send(result.success(email));
			});
		});
	});
};
'use strict';

module.exports = function(app, passport){
	app.namespace('/home', function(){		
		app.get('/', passport.validate, function(req, res){
			res.render('home/home');
		});
	});

	return app;
};
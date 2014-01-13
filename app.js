module.exports = function(passport, i18n){
	var express = require('express')
	, http = require('http')
	, path = require('path')
	, engine = require('ejs-locals')
	, flash = require('connect-flash');

	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	
	app.engine('ejs', engine);
	
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('holla hoop'));
	app.use(express.session());
	
	app.use(flash());
	
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(function(req, res, next){
		res.locals.authenticated = req.isAuthenticated();
		next();
	});
	
	app.use(i18n.init);
	app.use(i18n.middleware);
	
	app.use(app.router);
	app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	app.start = function(){
		http.createServer(app).listen(app.get('port'), function(){
		  console.log('Express server listening on port ' + app.get('port'));
		});
	};
	
	return app;
};
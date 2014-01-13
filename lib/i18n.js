var i18n = function(){
	var i18n = require('i18n'),
	path = require('path');
	
	i18n.configure({		
		locales:['pt-br', 'en'],
		defaultLocale: 'pt-br',
		directory: path.join(__dirname,'..', 'locales'),
		indent: '\t'
	});

	i18n.middleware = function(req, res, next){
		
		/*res.locals.__ = res.__ = function() {
			return i18n.__.apply(req, arguments);
		};*/
		next();
	};
	return i18n;
};

module.exports = i18n();
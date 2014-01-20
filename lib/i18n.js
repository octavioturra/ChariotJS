'use strict';

var i18n = function(){
	var i18n = require('i18n'),
	path = require('path');
	
	i18n.configure({		
		locales:['pt-br', 'en'],
		defaultLocale: 'pt-br',
		directory: path.join(__dirname,'..', 'locales'),
		indent: '\t'
	});

	return i18n;
};

module.exports = i18n();
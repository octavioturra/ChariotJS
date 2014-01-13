var container = require('dependable').container();

container.register('underscore', require('underscore'));
container.register('db', require('./lib/database'));

container.register('UserModel', require('./models/UserModel'));

container.register('i18n', require('./lib/i18n'));
container.register('passport', require('./lib/passport'));

container.load('./controllers/');

container.register('app', require('./app'));

container.resolve(function(index, app){
	app.start();
});
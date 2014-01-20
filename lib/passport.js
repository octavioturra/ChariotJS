module.exports = function(UserModel, i18n){
	var passport = require('passport')
	  , LocalStrategy = require('passport-local').Strategy;

	passport.defaultError = '/';  
	  
	passport.use(new LocalStrategy({usernameField: 'email'},
	  function(email, password, done) {
		UserModel.findOne({ email: email, password: password }, function(err, user) {
		  if (err) { return done(err); }
		  if (!user) {
			return done(null, false, { message: i18n.__('Incorrect user or password.') });
		  }
		  return done(null, user);
		});
	  }
	));
	
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  UserModel.findById(id, function(err, user) {
		done(err, user);
	  });
	});
	
	passport.validate = function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		return res.redirect(passport.defaultError);
	}
	
	return passport;
};
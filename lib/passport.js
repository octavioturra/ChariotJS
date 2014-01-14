module.exports = function(UserModel){
	var passport = require('passport')
	  , LocalStrategy = require('passport-local').Strategy;

	var User = new UserModel();  
	 
	passport.defaultError = '/error';  
	  
	passport.use(new LocalStrategy(
		usernameField: 'email',
	  function(email, password, done) {
		User.findOne({ email: email, password: password }, function(err, user) {
		  if (err) { return done(err); }
		  if (!user) {
			return done(null, false, { message: 'Incorrect user or password.' });
		  }
		  return done(null, user);
		});
	  }
	));
	
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
		done(err, user);
	  });
	});
	
	passport.validate = function(req, res, next){
		if(req.isAuthenticated()){
			next();
		}
		return req.redirect(passport.defaultError);
	}
	
	return passport;
};
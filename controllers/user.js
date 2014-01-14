var validator = require('validator');

module.exports = function(app, passport, result, UserModel){
	var User = new UserModel();

	app.get('/login', function(req, res, next){
		if(req.isAuthenticated()){
			return res.redirect('/home');
		}
		res.render('users/login');
	});
	app.post('/login', passport.authenticate('local', { 
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true 
	});
	//[Authenticate]
	app.get('/logout', passport.validate, function(req, res, next){
		req.logout();
		res.redirect('/');
	});
	app.get('/sigin', function(req, res, next){
		res.render('users/signup');
	});
	app.post('/sigin', function(req, res, next){
		var name = req.param('name')
		,email = req.param('email')
		,password = req.param('password')
		,confirmation = req.param('confirmation');
		if(!name||!email||!password||!confirmation){
			return res.send(result.error(10, 'Todos dados devem ser preenchidos.'));
		}
		if(validtaor.isEmail(email)===false){
			return res.send(result.error(11, 'E-mail inválido.'));
		}
		if(password!=confirmation){
			return res.send(result.error(12, 'Senha e confirmação não são iguais.'));
		}
		var user = new User({
			name: name,
			email: email,
			password: password
		});
		try{
			return res.send(result.ok(user._id));
		}catch(e){
			return res.send(result.error(13, e.message));
		}
	});
	//[Authenticate]
	app.get('/signout', passport.validate, function(req, res, next){
		res.render('users/signout');
	});
	//[Authenticate]
	app.post('/signout', passport.validate, function(req, res, next){
		var email = req.param('email')
		,password = req.param('password');
		
		User.findOne({email:email, password:password}, function(err, user){
			if(err){
				return res.send(result.error(20, 'Houve um erro ao consultar seu usuário'));
			}
			if(!user){
				return res.send(result.error(21, 'Usuário inexistente ou password inválido'));
			}
			user.active = false;
			try{
				return res.send(result.ok(user._id));
			}catch(e){
				return res.send(result.error(22, e.message));
			}
		})
	});
	app.get('/confirm/:confirmation', function(req, res, next){
	
	});
	app.post('/confirm/:confirmation', function(req, res, next){
	
	});
	//[Authenticate]
	app.get('/invite', passport.validate, function(req, res, next){
	
	});
	app.get('/invite/:invitation', function(req, res, next){
	
	});
	//[Authenticate]
	app.post('/invite/', passport.validate, function(req, res, next){
	
	});
	app.post('/invite/:invitation', function(req, res, next){
	
	});
	app.get('/changepass', function(req, res, next){
	
	});
	app.post('/changepass', function(req, res, next){
	
	});
};
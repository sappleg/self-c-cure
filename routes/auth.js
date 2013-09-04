exports.popover = function(req, res){
	//req.session.popover = new Date()
	console.log('My session:', req.session)
  res.render('auth/index_pop', req.viewVars);
};

exports.signup = function(req, res, next) {
	if (!req.body) {
		console.log('why u signup nobody?');
		return res.redirect('/');
	}
	
	var user = new app.models.User();
	
	user.set('email', req.body.email);
	user.set('password', req.body.pass);
//	user.set('providers', ['signup:'+user.get('email')]);
//	user.set('profiles', [{ _name: 'signup'}]);
	
	user.save( function(err) {
		if (err) { // validation failed
			req.viewVars.u = user;
			return classicYieldErr(req, res, 'signUp', err);
		} else { // signup successful
			req.session.user = {
				provider: 'signup',
				id: user.get('id')
			}

			req.session.auth = {
				signup: {},
				loggedIn: true,
				userId: user.get('id')
			}
			
			req.flash('notice', 'Welcome!');
			req.viewVars.welcome_login = 'Welcome, Spencer';
  		
            res.render('auth/win_pop', req.viewVars);
		}
	})
};

exports.login = function(req, res, next) {
	if (!req.body) {
		console.log('why u login nobody?');
	    return res.redirect('/');
	}
	
	app.models.User.login(req.body.email, req.body.pass, function(err, user) {
		if (err) { // validation failed
			return classicYieldErr( req, res, 'signIn', err);
		} else {
			if (user) { // login
				req.session.user = {
					provider: 'signup',
					id: user.get('id')
				}

				req.session.auth = {
					signup: {},
					loggedIn: true,
					userId: user.get('id')
				}
				
				req.flash('notice', 'Welcome!');
				req.viewVars.welcome_login = 'Welcome, Spencer';
	  		
                res.render('auth/win_pop', req.viewVars);
	  		
			} else { // not found
				return classicYieldErr(req, res, 'signIn', {
                    errors: {
                        loginpass: {
                            name: 'V',
                            path: 'login+password',
                            type: 'loginpass'
                        }
                    }
                });
			}
		}
	})
};

// display form error
function classicYieldErr(req, res, mode, err) {
	req.viewVars.erroredForm = mode;

	if (mode === 'signIn') {
		req.viewVars.signin_errors = app.helpers.displayErrors(err);
	} else {
		req.viewVars.signup_errors = app.helpers.displayErrors(err);
	}
	req.viewVars.email = req.body.email;
	
	res.render('auth/index_pop', req.viewVars);
}
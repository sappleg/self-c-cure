exports.signup = function(req, res, next) {
	if (!req.body) {
		return res.send(404);
	}
	
	var user = new app.models.User();
	
	user.set('email', req.body.email);
	user.set('password', req.body.pass);

	user.save(function(err) {
		if (err) { // validation failed
            res.send(err);
		} else { // signup successful
			req.session.user = {
				id: user.get('id')
			}

			req.session.auth = {
				loggedIn: true,
				userId: user.get('id')
			}

            res.send(201);
		}
	});
};

exports.login = function(req, res, next) {
	if (!req.body) {
	    return res.send(404);
	}
	
	app.models.User.login(req.body.email, req.body.pass, function(err, user) {
		if (err) { // validation failed
            res.send(err);
		} else {
			if (user) { // login
				req.session.user = {
					id: user.get('id')
				}

				req.session.auth = {
					loggedIn: true,
					userId: user.get('id')
				}
				
                res.send(200);
	  		
			} else { // not found
                res.send(401);
			}
		}
	});
};

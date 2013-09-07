/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

exports.signup = function(req, res) {
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
//	if (!req.body) {
//	    return res.send(404);
//	}
	
	app.models.User.login(req.body.email, req.body.pass, function(err, user) {
		if (err) { // validation failed
            res.send(400, err);
		} else {
			if (user) { // login
				req.session.user = {
					id: user.get('id')
				}

				req.session.auth = {
					loggedIn: true,
					userId: user.get('id')
				}

                if (req.url == '/auth/login/') {
                    res.send({ email: req.body.email, id: user.get('id') });
                } else {
                    next();
                }
			} else { // not found
                if (req.url == '/auth/signup/') {
                    next();
                } else {
                    res.send(401);
                }
			}
		}
	});
};

exports.requireLogin = function(req, res, next) {
	if (req.session) {
		if (req.session.user) {
			next();
		} else {
            res.redirect('/auth/login/')
		}
	}
}

exports.home = function(req, res){
    res.render('src/index', req.viewVars);
};
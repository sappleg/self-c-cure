/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/5/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var express = require('express'),
    auth = require('./routes/auth'),
    port = process.env.PORT || 8142;

GLOBAL.app = module.exports = express.createServer();

app.configure('development', function() {
    app.config = JSON.parse(require('fs').readFileSync('./config/development.json', 'utf8'));
});

app.configure('production', function() {
	app.config = {};
});

app.configure(function() {
    app.use(express.logger({ format: app.config.logger.format }));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'self-c-cure' }));
    app.use(auth.login);
    app.use(express.static(__dirname + '/src'));
    app.use(app.router);
});

app.configure('development', function() {
	app.use(express.errorHandler({
		'dumpExceptions': true,
		'showStack': true
	}));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

require('./models/models_main.js');
require('./routes/routes_main.js');

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
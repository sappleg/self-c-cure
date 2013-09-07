/**
 * Module dependencies.
 */

var express = require('express'),
    port = process.env.PORT || 8142;

GLOBAL.app = module.exports = express.createServer();

app.configure('development', function() {
    app.config = JSON.parse(require('fs').readFileSync('./config/development.json', 'utf8'));
});

app.configure('production', function() {
	app.config = {};
});

// Configuration

app.configure(function() {
    app.use(express.logger({
        format: app.config.logger.format
    }));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'changeME' }));
    app.use(express.static(__dirname + '/src'));
    app.use(app.router);
});

// Show errors, keep bots away
app.configure('development', function() {
	app.use(express.errorHandler({
		'dumpExceptions': true,
		'showStack': true
	}));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

// this is important to show fields with errors
if (!app.helpers) {
    app.helpers = {};
}

model = require('./models/models_main.js');
routes = require('./routes/routes_main.js');

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

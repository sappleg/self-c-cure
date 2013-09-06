/*
 * Invoke all models we need, expose mongoose
 */

GLOBAL.mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.availablePlugins = require('../lib/mongoose-plugins');
var url = app.config.mongodb_url;
console.log(url);

require('./user.js');
require('./device.js');

app.models = mongoose.models

mongoose.connect(url);

mongoose.models.User.count({}, function(err, num) {
    console.log('users:', num);
});
mongoose.models.Device.count({}, function(err, num) {
    console.log('devices:', num);
});

module.exports = mongoose.models;

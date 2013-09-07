/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/5/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

GLOBAL.mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.availablePlugins = require('../lib/mongoose-plugins');
var url = app.config.mongodb_url;

require('./user.js');
require('./device.js');

app.models = mongoose.models;

mongoose.connect(url);

mongoose.models.User.count({}, function(err, num) {
    console.log('users:', num);
});

mongoose.models.Device.count({}, function(err, num) {
    console.log('devices:', num);
});

module.exports = mongoose.models;
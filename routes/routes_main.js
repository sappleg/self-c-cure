/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/5/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var auth = require('./auth.js'),
    device = require('./device.js');

/* Arduino End-points */
app.get('/devices/:deviceId?/open/', device.open);
app.get('/devices/:deviceId?/closed/', device.closed);

/* Device modification */
app.put('/user/:userId?/devices/:deviceId?', device.update);
app.delete('/user/:userId?/devices/:deviceId?', device.delete);

/* Device creation and retrieval */
app.get('/user/:userId?', device.retrieve);
app.post('/user/:userId?/devices/', device.register);

/* Authentication */
app.post('/auth/signup/', auth.signup);

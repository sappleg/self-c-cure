/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/7/13
 * Time: 12:44 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var timers = {},
    mailer = require('./mailer.js'),
    Q = require('q');

exports.startTimer = function(deviceId, limit) {

    timers[deviceId] = setTimeout(function() {
        var locals = {};
        var emailDeferred = Q.defer();
        var periodDeferred = Q.defer();

        app.models.Device.getDevice(deviceId, function(err, device) {
            if (!err) {
                app.models.User.getUser(device[0].userId.toString(), function(err, user) {
                    if (!err) {
                        locals.email = user[0].email;
                        emailDeferred.resolve(user[0].email);
                    }
                })
            }
        });

        app.models.Device.getDevice(deviceId, function(err, device) {
            if (!err) {
                locals.period = device[0].limit;
                periodDeferred.resolve(device[0].limit);
            }
        });

        Q.all([emailDeferred.promise, periodDeferred.promise]).then(function() {
                mailer.openEmail(locals, function(err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }, function(err) {
                console.log(err);
            }
        );

        clearTimeout(timers[deviceId]);
        delete timers[deviceId];
    }, limit * 1000);
}

exports.stopTimer = function(deviceId) {
    clearTimeout(timers[deviceId]);
    delete timers[deviceId];
}

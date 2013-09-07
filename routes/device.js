/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var path = require('path'),
    mailer = require('../helpers/mailer.js'),
    rules = require('../helpers/rules.js');

exports.retrieve = function(req, res) {
    if (!req.param('userId')) {
        res.send(404);
    }

    app.models.Device.getDevices(req.param('userId'), function(err, userDevices) {
        if (!err) {
            app.models.User.getUser(req.param('userId'), function(err, deviceUser) {
                if (!err) {
                    res.send({ user: deviceUser, devices: userDevices });
                } else {
                    res.send(500);
                }
            });
        } else {
            res.send(500);
        }
    });
}

exports.register = function(req, res) {
    if (!req.body) {
        res.send(404);
    }

    var device = new app.models.Device();
    device.set('name', req.body.name);
    device.set('userId', req.param('userId'));
    device.set('deviceId', req.body.deviceId);
    device.set('limit', req.body.limit);
    device.set('ranges', req.body.ranges);
    device.set('armed', req.body.armed);

    device.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(200);
        }
    });
}

exports.update = function(req, res) {
    if (!req.body) {
        res.send(404);
    }

    app.models.Device.updateDevice(req.param('deviceId'), req.body, function(err) {
        if (!err) {
            res.send(200);
        } else {
            res.send(err);
        }
    });
}

exports.delete = function(req, res) {
    if (!req.body) {
        res.send(404);
    }

    app.models.Device.deleteDevice(req.param('deviceId'), function(err) {
        if (!err) {
            res.send(200);
        } else {
            res.send(500);
        }
    });
}

exports.email = function(req, res) {
    var options = {
            root: path.join(__dirname, "../views/mailer")
        },
        context = {
            email: "spencer.applegate3@gmail.com",
            period: 30
        };

    mailer.openEmail(options, context, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(200);
        }
    });
}

exports.getData = function(req, res) {
    if (!req.body) {
        res.send(404);
    }

    app.models.Device.getDeviceData(req.body.id, function(err) {
        if (err) {
            res.send(err);
        }
    })
}

exports.open = function(req, res) {
    console.log(req.param('deviceId'));
    res.send(200);
}

exports.closed = function(req, res) {
    console.log(req.param('deviceId'));
    res.send(200);
}

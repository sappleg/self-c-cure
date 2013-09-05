/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

exports.retrieve = function(req, res) {
    if (!req.param('userId')) {
        res.send(404);
    }

    app.models.Device.getDevices(req.param('userId'), function(err, devices) {
        res.send(devices);
    });
}

exports.register = function(req, res) {
    if (!req.body) {
        res.send(404);
    }

    var device = new app.models.Device();
    device.set('name', req.body.name);
    device.set('userId', req.param('userId'));
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
/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

exports.retrieve = function(req, res) {
    console.log(req.route);
}

exports.register = function(req, res) {
    if (!req.body) {
        res.send(404);
    }

    var device = new app.models.Device();
    device.set('name', req.body.name);
    device.set('userId', req.body.userId);
    device.set('limit', req.body.limit);
    device.set('ranges', req.body.ranges);
//    _.each(req.body.ranges, function(value) {
//        device.ranges.push(value);
//    });
    device.set('armed', req.body.armed);

    device.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(200);
        }
    });
}
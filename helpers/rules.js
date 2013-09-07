/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/7/13
 * Time: 12:44 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

exports.startTimer = function(limit) {
    var counter = 0;
    setInterval(function() {
        if (counter >= limit) {
            return;
        }
        counter += 1;
    }, 1000);
}

exports.stopTimer = function() {

}
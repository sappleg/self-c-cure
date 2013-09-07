/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/5/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var nodemailer = require('nodemailer'),
    emailTemplates = require('swig-email-templates'),
    path = require('path');


// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "self.c.cure@gmail.com",
        pass: "PenAppsFall2013"
    }
});

exports.openEmail = function(options, context, cb) {
    emailTemplates(options, function(err, render) {
        render('open.html', context, function(err, html) {
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: "self.c.cure@gmail.com", // sender address
                to: "spencer.applegate3@gmail.com", // list of receivers
                subject: "Hello", // Subject line
                text: html, // plaintext body
                html: html
            }

            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + response.message);
                }

                // if you don't want to use this transport object anymore, uncomment following line
                smtpTransport.close(); // shut down the connection pool, no more messages
            });
        });

        cb();
    });
};


/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/5/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var nodemailer = require('nodemailer'),
    path = require('path'),
    templatesDir = path.resolve(__dirname, '..', 'views/mailer'),
    emailTemplates = require('email-templates');


var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "self.c.cure@gmail.com",
        pass: "PenAppsFall2013"
    }
});

exports.email = function(locals, cb) {

    emailTemplates(templatesDir, function(err, template) {
        if (err) {
            console.log(err);
        } else {
            template(locals.type, locals, function(err, html, text) {
                if (err) {
                    console.log(err);
                } else {
                    var mailOptions = {
                        from: "self.c.cure@gmail.com",
                        to: locals.email,
                        subject: "A message from Self-C-Cure",
                        text: text,
                        html: html
                    }

                    smtpTransport.sendMail(mailOptions, function(error, response){
                        if(error){
                            console.log(error);
                        }else{
                            console.log("Message sent: " + response.message);
                        }

                        smtpTransport.close();
                    });
                }
            });
            cb();
        }
    });
};
/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 9/5/13
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var Schema = mongoose.Schema,
    validations = require('./validations.js'),
    salt = 'HuntersSaltyGrundle',
    SHA2 = new (require('jshashes').SHA512)();

function encodePassword(pass) {
    if (typeof pass === 'string' && pass.length < 6) {
        return '';
    }

    return SHA2.b64_hmac(pass, salt);
}

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        set: encodePassword,
        required: true
    }
});

UserSchema.statics.login = function(login, pass, cb) {
	if (login && pass) {
		mongoose.models.User
			.where('email', login)
			.where('password', encodePassword(pass))
            .findOne(cb);
	} else {
        cb(null, null);
    }
}

UserSchema.statics.getUser = function(userId, cb) {
    if (userId) {
        mongoose.models.User
            .find({ "_id": mongoose.Types.ObjectId(userId) }, cb);
    }
}

UserSchema.path('email').validate(validations.uniqueFieldInsensitive('User', 'email'), 'unique');
UserSchema.path('email').validate(validations.emailFormat, 'format');
UserSchema.path('password').validate(validations.cannotBeEmpty, 'password');

mongoose.model('User', UserSchema);
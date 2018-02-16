var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var schema = mongoose.Schema({
    display_name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    following: [{ type: String }],
    tweetCount : { type: Number, required: true}
});

schema.methods.checkPassword = function(password) {
    var that = this;
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, that.password, function(err, res) {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}

schema.statics.hashPassword = function(password, saltRounds) {
    return bcrypt.hashSync(password, saltRounds);
}

module.exports = mongoose.model('users', schema);
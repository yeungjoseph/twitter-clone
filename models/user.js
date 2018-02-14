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
    return bcrypt.compare(password, this.password);
}

schema.statics.hashPassword = function(password, saltRounds) {
    return bcrypt.hashSync(password, saltRounds);
}

module.exports = mongoose.model('users', schema);
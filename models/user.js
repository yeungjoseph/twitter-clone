var mongoose = require('mongoose');

var schema = mongoose.Schema({
    display_name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    following: [{ type: String }],
    tweetCount : { type: Number, required: true}
});

module.exports = mongoose.model('users', schema);
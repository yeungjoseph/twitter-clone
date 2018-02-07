var mongoose = require('mongoose');

var schema = mongoose.Schema({
    author: { type: String, required: true },
    handle: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('tweets', schema);
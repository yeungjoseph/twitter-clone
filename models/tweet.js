var mongoose = require('mongoose');

var schema = mongoose.Schema({
    author:  { type: String, required: true },
    handle:  { type: String, required: true },
    content: { type: String, required: true },
    likes:   [{ type: String }],
});

module.exports = mongoose.model('tweets', schema);
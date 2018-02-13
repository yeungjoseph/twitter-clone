var session = require('client-sessions');
var cookieParser = require('cookie');
var config = require('./config');

var io = null;

module.exports = {
    init: function(server) {
        io = require('socket.io')(server);
        io.on('connection', function(socket) {
            console.log('a user connected');

            // Check cookie from client is not messed with
            var cookie = cookieParser.parse(socket.handshake.headers.cookie);
            var opts = config.session;
            var content = session.util.decode(opts, cookie.session).content;  
            
            if (content !== 'undefined')
            {
                var rooms = content.user.following;
                rooms.forEach(function(room) {
                    socket.join(room);
                });
            }
            // Terminate the socket
            else
            {
                socket.disconnect(false);
            }
        });
    },
    
    instance: function() {
        return io;
    }
}
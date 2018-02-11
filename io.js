var io = null;

module.exports = {
    init: function(server) {
        io = require('socket.io')(server);
        io.on('connection', function(socket) {
            console.log('a user connected');
        });
    },
    
    instance: function() {
        return io;
    }
}
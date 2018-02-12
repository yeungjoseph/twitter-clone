var io = null;

module.exports = {
    init: function(server) {
        io = require('socket.io')(server);
        io.on('connection', function(socket) {
            console.log('a user connected');
            // once a client connects, we expect them to tell us which
            // rooms they want to join
            socket.on('room', function(room) {
                socket.join(room);
            });
        });
    },
    
    instance: function() {
        return io;
    }
}
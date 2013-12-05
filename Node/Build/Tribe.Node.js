Tribe = global.Tribe || {};
Tribe.Persistence = {};var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

module.exports = {
    start: function(port) {
        server.listen(port || 1678);
    }
};

io.sockets.on('connection', function (socket) {
    socket.on('message', function (envelope) {
        socket.broadcast.to(envelope.channel || 'defaultChannel').emit('message', envelope);
    });
});(function () {
    var fs = require('q-io/fs');
    
    Tribe.Persistence.fileSystem = {
        store: function(partitionKey, rowKey, data) {
            return fs.makeDirectory(targetFolder(partitionKey))
                .then(writeFile, console.error);
            
            function writeFile() {
                return fs.write(targetFile(partitionKey, rowKey), data)
                    .fail(console.error);
            }
        },
        retrieve: function(partitionKey, rowKey) {
            return fs.read(targetFile(partitionKey, rowKey));
        }
    };
    
    function targetFolder(partitionKey) {
        return __dirname + '/' + partitionKey;
    }
    
    function targetFile(partitionKey, rowKey) {
        return __dirName + '/' + partitionKey + '/' + rowKey + '.json';
    }
})();

module.exports = (function () {
    var fs = require('q-io/fs'),
        log = require('tribe/logger');

    var api = {
        put: function(partitionKey, rowKey, data) {
            return fs.makeTree(targetFolder(partitionKey))
                .then(writeFile)
                .fail(log.error);

            function writeFile() {
                return fs.write(targetFile(partitionKey, rowKey), JSON.stringify(data))
                    .fail(log.error);
            }
        },
        get: function(partitionKey, rowKey) {
            return fs.read(targetFile(partitionKey, rowKey))
                .then(JSON.parse)
                .fail(log.error);
        },
        basePath: __dirname
    };
    return api;
    
    function targetFolder(partitionKey) {
        return api.basePath + '/' + partitionKey;
    }
    
    function targetFile(partitionKey, rowKey) {
        return api.basePath + '/' + partitionKey + '/' + rowKey + '.json';
    }
})();

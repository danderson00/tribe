module.exports = (function () {
    var fs = require('q-io/fs');

    var api = {
        put: function(partitionKey, rowKey, data) {
            return fs.makeTree(targetFolder(partitionKey))
                .then(writeFile)
                .fail(console.error);

            function writeFile() {
                return fs.write(targetFile(partitionKey, rowKey), JSON.stringify(data))
            }
        },
        get: function(partitionKey, rowKey) {
            return fs.read(targetFile(partitionKey, rowKey))
                .then(JSON.parse);
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

(function () {
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

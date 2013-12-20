Mock = {
    fs: function(files) {
        var fs = {
            readFileSync: function(path) {
                return files[path];
            }
        };
        sinon.spy(fs, 'readFileSync');
        return fs;
    }
};

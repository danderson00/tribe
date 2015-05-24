var build = require('tribe/build');

build.activities.register('dependencies', function (options) {
    return {
        prepare: build.blocks('addFilesToContext')('dependencies', options.path, /\.js$/, false)
    };
});
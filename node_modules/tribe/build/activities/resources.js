var build = require('tribe/build');

build.activities.register('resources', function (options) {
    return {
        prepare: build.blocks('addFilesToContext')('js', options.path, /\.js$/, false),
        server: build.blocks('requireDirectory')(options.path)
    };
});
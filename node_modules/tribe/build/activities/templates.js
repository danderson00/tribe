var build = require('tribe/build');

build.activities.register('templates', function (options) {
    return {
        prepare: build.blocks('addFilesToContext')('html', options.path, /\.html?$/)
    };
});
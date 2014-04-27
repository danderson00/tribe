var build = require('tribe/build');

build.activities.register('styles', function (options) {
    return {
        prepare: build.blocks('addFilesToContext')('css', options.path, /\.css$/)
    };
});
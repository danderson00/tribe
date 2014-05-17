var build = require('tribe/build');

build.activities.register('scripts', function (options) {
    return {
        prepare: build.blocks('addFilesToContext')('js', options.path, /\.js$/, false)
    };
});
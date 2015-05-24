var build = require('tribe/build'),
    Q = require('q');

build.activities.register('panes', function (options) {
    return {
        prepare: function (context, b) {
            return Q.all([
                build.blocks('addFilesToContext')('js', options.path, /\.js$/, false)(context, b),
                build.blocks('addFilesToContext')('html', options.path, /\.html?$/)(context, b),
                build.blocks('addFilesToContext')('css', options.path, /\.css$/)(context, b)
            ]);
        },
        server: build.blocks('requireDirectory')(options.path)
    };
});
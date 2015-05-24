var build = require('tribe/build'),
    test = require('tribe/test'),
    paths = require('tribe/utilities/paths');

build.activities.register('tests.server', function (options) {
    return {
        server: function (context, b) {
            return test.loadDirectory(b.appPath.resolve(options.path));
        }
    };
});
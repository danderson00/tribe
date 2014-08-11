var build = require('tribe/build'),
    options = require('tribe/options'),
    _ = require('underscore');

build.activities.register('static', function (activityOptions) {
    return {
        output: function (context, buildOptions) {
            if (activityOptions.outputPath)
                _.each(options.server.modules, function (module) {
                    module.static(activityOptions.outputPath, true);
                });
        }
    };
});
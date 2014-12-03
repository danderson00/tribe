var build = require('tribe/build'),
    testOptions = require('tribe/options').test;

build.activities.register('tests.browser', function (options) {
    return {
        prepare: build.blocks('addFilesToContext')('tests', options.path, testOptions.fileFilter, false)
    };
});
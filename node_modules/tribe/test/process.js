module.exports = function () {
    var pubsub = require('tribe.pubsub'),
        options = require('tribe/options'),
        test = require('tribe/test').initialise(),
        buildEngine = require('tribe/build'),
        _ = require('underscore');

    // this is less than ideal. It allows code running on the server side like actors to use knockout without requiring it or even installing it
    // possibly will be replaced by passing knockout to modules using a custom module loader like tests are now
    ko = require('knockout');

    options.test.agent = 'server';
    options.showDependencies = false;
    pubsub.sync = true;

    var build = _.findWhere(options.builds, { name: 'app' });
    if (build) {
        build.phases = ['server'];
        buildEngine
            .configure(build)
            .execute()
            .then(function () {
                pubsub.subscribe('test.run', test.run);
            });
    } else
        pubsub.subscribe('test.run', test.run);
};
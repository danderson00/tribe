module.exports = {
    run: function (options) {
        var pubsub = require('tribe.pubsub'),
            hub = require('tribe/client/hub');

        T.options.pubsub = pubsub;
        hub.subscribe({ topics: 'test.*' });
        pubsub.subscribe('test.*', function (data, envelope) {
            hub.publish(envelope);
        });

        require('tribe/options').apply(options);
        require('tribe/test').initialise();
    }
};

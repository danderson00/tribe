﻿// force browserify to include any modules that may be required here

require('./Pubsub.extensions');
require('tribe/actors/extensions');
require('./worker');
require('./debugActions');
require('./bindingHandlers');

module.exports = {
    // client
    hub: require('./hub'),
    services: require('./services'),

    //common
    pubsub: require('tribe.pubsub'),
    register: require('./register'),
    options: require('tribe/options')
};

// composite has a logger packaged, but use the node version as it will likely get updated
T.logger = require('tribe.logger');
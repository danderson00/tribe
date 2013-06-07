pack(sources({
     to: 'Build/Tribe.Composite.js'
}));

pack(sources({
    to: 'Build/Tribe.Composite.min.js',
    minify: true
}));

pack(sources({
    to: 'Build/Tribe.Composite.debug.js',
    template: 'debug'
}));

function sources(options) {
    return _.extend({
        include: [
            'Libraries/Tribe.PubSub.js',
            'Source/setup.js',
            'Source/options.js',
            folder('Utilities'),
            folder('Types'),
            folder('Events'),
            folder('LoadHandlers'),
            folder('LoadStrategies'),
            folder('Transitions'),
            folder('Api'),
            folder('Loggers')
        ]
    }, options);

    function folder(name) {
        return { files: 'Source' + (name ? '/' + name : '') + '/*.js', recursive: true };
    }
}


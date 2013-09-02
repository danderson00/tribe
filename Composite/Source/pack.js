pack({
    to: '../Build/Tribe.Composite.js',
    include: includes()
});

pack({
    to: '../Build/Tribe.Composite.min.js',
    include: includes(),
    minify: true
});

pack({
    to: '../Build/Tribe.Composite.chrome.js',
    include: includes(true)
});

function includes(debug) {
    return [
        'license.js',
        '../Libraries/Tribe.PubSub' + ((debug && '.chrome') || '') + '.js',
        T.scripts(options('setup.js')),
        T.scripts(options('options.js')),
        T.scripts(options('Utilities', debug)),
        T.scripts(options('Types')),
        T.scripts(options('Events')),
        T.scripts(options('LoadHandlers')),
        T.scripts(options('LoadStrategies')),
        T.scripts(options('Transitions')),
        T.scripts(options('Api')),
        T.scripts(options('Loggers'))
    ];
    
    function options(path) {
        return {
            path: path,
            domain: 'Tribe.Composite',
            debug: debug
        };
    }    
}


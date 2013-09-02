pack({
    to: '../Build/Tribe.PubSub.js',
    include: T.scripts(options()),
    prioritise: 'core.js'
});

pack({
    to: '../Build/Tribe.PubSub.chrome.js',
    include: T.scripts(options(true)),
    prioritise: 'core.js'
});

pack({
    to: '../Build/Tribe.PubSub.min.js',
    include: T.scripts(options()),
    prioritise: 'core.js',
    minify: true
});

function options(debug) {
    return {
        path: '*.js',
        domain: 'Tribe.PubSub',
        debug: debug
    };
}
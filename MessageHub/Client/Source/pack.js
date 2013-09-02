pack({
    to: '../Build/Tribe.MessageHub.js',
    include: T.scripts(options())
});

pack({
    to: '../Build/Tribe.MessageHub.chrome.js',
    include: T.scripts(options(true))
});

pack({
    to: '../Build/Tribe.MessageHub.min.js',
    include: T.scripts(options()),
    minify: true
});

function options(debug) {
    return {
        path: '*.js',
        domain: 'Tribe.MessageHub',
        debug: debug
    };
}
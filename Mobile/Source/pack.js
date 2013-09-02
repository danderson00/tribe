function includes(debug) {
    return [
        T.panes(options('Panes', debug)),
        T.scripts(options('Infrastructure', debug)),
        T.styles(options('Css', debug))
    ];
}

function options(path, debug) {
    return {
        path: path,
        prefix: 'Mobile/',
        domain: 'Tribe.Mobile',
        debug: debug
    };
}

pack({
    to: '../Build/Tribe.Mobile.js',
    include: includes()
});

pack({
    to: '../Build/Tribe.Mobile.min.js',
    include: includes(),
    minify: true
});

pack({
    to: '../Build/Tribe.Mobile.chrome.js',
    include: includes(true)
});

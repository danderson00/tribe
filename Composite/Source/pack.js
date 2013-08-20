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
        file('setup.js'),
        file('options.js'),
        folder('Utilities'),
        folder('Types'),
        folder('Events'),
        folder('LoadHandlers'),
        folder('LoadStrategies'),
        folder('Transitions'),
        folder('Api'),
        folder('Loggers')
    ];

    function folder(name) {
        return { files: name + '/*.js', recursive: true, template: debug && T.chromeScript('Tribe.Composite') };
    }
    
    function file(name) {
        return { files: name, template: debug && T.chromeScript('Tribe.Composite') };
    }
}


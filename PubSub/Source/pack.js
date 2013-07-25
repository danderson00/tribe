pack({
    to: '../Build/Tribe.PubSub.js',
    include: '*.js',
    prioritise: 'core.js'
});

pack({
    to: '../Build/Tribe.PubSub.chrome.js',
    include: '*.js',
    prioritise: 'core.js',
    template: T.chromeScript('Tribe.PubSub')
});

pack({
    to: '../Build/Tribe.PubSub.min.js',
    include: '*.js',
    prioritise: 'core.js',
    minify: true
});
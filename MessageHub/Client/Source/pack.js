pack({
    to: '../Build/Tribe.MessageHub.js',
    include: '*.js'
});

pack({
    to: '../Build/Tribe.MessageHub.chrome.js',
    include: '*.js',
    template: T.chromeScript('Tribe.MessageHub')
});

pack({
    to: '../Build/Tribe.MessageHub.min.js',
    include: '*.js',
    minify: true
});
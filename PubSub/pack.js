pack({
    to: 'Build/Tribe.PubSub.js',
    include: 'Source/*.js',
    prioritise: 'core.js'
});

pack({
    to: 'Build/Tribe.PubSub.debug.js',
    include: 'Source/*.js',
    prioritise: 'core.js',
    template: 'debug'
});

pack({
    to: 'Build/Tribe.PubSub.min.js',
    include: 'Source/*.js',
    prioritise: 'core.js',
    minify: true
});

pack({
    to: 'Tests/tests.js',
    include: 'Tests/*.tests.js',
    template: 'debug'
});
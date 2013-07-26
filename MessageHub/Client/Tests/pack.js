pack({
    to: 'tests.js',
    include: '*.tests.js',
    template: T.chromeScript('Tests')
});

pack({
    to: 'tests.min.js',
    include: '*.tests.js',
    minify: true
});
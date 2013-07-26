var unitTestIncludes = [
    'Unit/Utilities/*.tests.js',
    'Unit/Types/*.tests.js',
    'Unit/LoadHandlers/*.tests.js',
    'Unit/LoadStrategies/*.tests.js',
    'Unit/Events/*.tests.js',
    'Unit/Transitions/*.tests.js'
];

var integrationTestIncludes = [
    'Integration/*.tests.js'
];

var infrastructureIncludes = [
    'Integration/Infrastructure/*.js',
    'Unit/Infrastructure/*.js'
];

pack({
    to: 'tests.js',
    include: ['setup.js', infrastructureIncludes, unitTestIncludes, integrationTestIncludes],// T.panes.chrome('Integration/Panes')],
    recursive: true,
    prioritise: 'setup.js',
    template: T.chromeScript('Tests')
});

pack({
    to: 'tests.min.js',
    include: ['setup.js', infrastructureIncludes, unitTestIncludes, integrationTestIncludes], //T.panes('Integration/Panes')],
    recursive: true,
    prioritise: 'setup.js',
    minify: true
});

pack({
    to: 'tests.unit.js',
    include: ['setup.js', infrastructureIncludes, unitTestIncludes],
    recursive: true,
    prioritise: 'setup.js',
    template: T.chromeScript('Tests')
});


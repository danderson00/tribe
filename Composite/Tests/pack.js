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
    include: ['setup.js'].concat(infrastructureIncludes, unitTestIncludes, integrationTestIncludes),
    recursive: true,
    prioritise: 'setup.js',
    template: T.chromeScript('Tests')
});

pack({
    to: 'tests.unit.js',
    include: ['setup.js'].concat(infrastructureIncludes, unitTestIncludes),
    recursive: true,
    prioritise: 'setup.js',
    template: T.chromeScript('Tests')
});


var unitTestIncludes = [
    'Tests/Unit/Utilities/*.tests.js',
    'Tests/Unit/Types/*.tests.js',
    'Tests/Unit/LoadHandlers/*.tests.js',
    'Tests/Unit/LoadStrategies/*.tests.js',
    'Tests/Unit/Events/*.tests.js',
    'Tests/Unit/Transitions/*.tests.js'
];

var integrationTestIncludes = [
    'Tests/Integration/*.tests.js'
];

var infrastructureIncludes = [
    'Tests/Integration/Infrastructure/*.js',
    'Tests/Unit/Infrastructure/*.js'
];

pack({
    to: 'Tests/tests.js',
    include: ['Tests/setup.js'].concat(infrastructureIncludes, unitTestIncludes, integrationTestIncludes),
    recursive: true,
    prioritise: 'setup.js',
    template: 'debug'
});

pack({
    to: 'Tests/tests.unit.js',
    include: ['Tests/setup.js'].concat(infrastructureIncludes, unitTestIncludes),
    recursive: true,
    prioritise: 'setup.js',
    template: 'debug'
});


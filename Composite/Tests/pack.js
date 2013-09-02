var unitTestIncludes = [
    T.scripts('Unit/Utilities/*.tests.js', true),
    T.scripts('Unit/Types/*.tests.js', true),
    T.scripts('Unit/LoadHandlers/*.tests.js', true),
    T.scripts('Unit/LoadStrategies/*.tests.js', true),
    T.scripts('Unit/Events/*.tests.js', true),
    T.scripts('Unit/Transitions/*.tests.js', true)
];

var integrationTestIncludes = [
    T.scripts('Integration/*.tests.js', true)
];

var infrastructureIncludes = [
    T.scripts('Integration/Infrastructure/*.js', true),
    T.scripts('Unit/Infrastructure/*.js', true)
];

pack({
    to: '../Build/Tests/Tribe.Composite.tests.js',
    include: ['setup.js', infrastructureIncludes, unitTestIncludes, integrationTestIncludes],
    prioritise: 'setup.js'
});

pack(T.mockjax('../Build/Tests/Tribe.Composite.tests.mockjax.js', 'Integration/Panes'));
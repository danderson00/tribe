var unitTestIncludes = [
    T.scripts('Unit/Utilities/*.tests.js'),
    T.scripts('Unit/Types/*.tests.js'),
    T.scripts('Unit/LoadHandlers/*.tests.js'),
    T.scripts('Unit/LoadStrategies/*.tests.js'),
    T.scripts('Unit/Events/*.tests.js'),
    T.scripts('Unit/Transitions/*.tests.js')
];

var integrationTestIncludes = [
    T.scripts('Integration/*.tests.js')
];

var infrastructureIncludes = [
    T.scripts('Integration/Infrastructure/*.js'),
    T.scripts('Unit/Infrastructure/*.js')
];

pack({
    include: ['setup.js', infrastructureIncludes, unitTestIncludes, integrationTestIncludes],
    prioritise: 'setup.js'
}).to({
    '../Build/Tests/Tribe.Composite.tests.js': { debug: true },
    '../Build/Tests/Tribe.Composite.tests.ie.js': { },
});

pack(T.mockjax('../Build/Tests/Tribe.Composite.tests.mockjax.js', 'Integration/Panes'));
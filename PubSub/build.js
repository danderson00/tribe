var pack = require('packscript').pack;

Pack.api.Log.setLevel('info');

pack({
    include: T.scripts({
        path: 'Source/*.js',
        domain: 'Tribe.PubSub'
    }),
    first: 'PubSub.js',
    last: ['Actor.core.js', 'Actor.handlers.js', 'exports.js']
}).to(T.webTargets('Build/Tribe.PubSub'));

pack([T.scripts('Tests/*.tests.js')]).to({
    'Build/Tests/Tribe.PubSub.tests.js': { debug: true },
    'Build/Tests/Tribe.PubSub.tests.ie.js': {},
});

pack.all();
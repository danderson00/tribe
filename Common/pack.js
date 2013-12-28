pack({
    include: T.scripts({ path: 'Source/*.js', domain: 'Tribe.Common' }),
    first: 'setup.js'
}).to(T.webTargets('Build/Tribe.Common'));

pack([T.scripts('Tests')]).to('Build/Tests/Tribe.Common.tests.js');
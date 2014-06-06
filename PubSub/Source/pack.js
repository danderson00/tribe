pack({    
    include: T.scripts({
        path: '*.js',
        domain: 'Tribe.PubSub'
    }),
    first: 'PubSub.js',
    last: ['Actor.core.js', 'Actor.handlers.js', 'exports.js']
}).to(T.webTargets('../Build/Tribe.PubSub'));
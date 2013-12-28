pack({    
    include: T.scripts({
        path: '*.js',
        domain: 'Tribe.PubSub'
    }),
    first: 'PubSub.js',
    last: 'exports.js'
}).to(T.webTargets('../Build/Tribe.PubSub'));
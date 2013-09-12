pack({    
    include: T.scripts({
        path: '*.js',
        domain: 'Tribe.PubSub'
    }),
    prioritise: 'PubSub.js'
}).to(T.webTargets('../Build/Tribe.PubSub'));
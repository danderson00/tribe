pack({    
    include: T.scripts({
        path: '*.js',
        domain: 'Tribe.PubSub'
    }),
    prioritise: 'core.js'
}).to(T.webTargets('../Build/Tribe.PubSub'));
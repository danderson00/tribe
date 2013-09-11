pack({
    include: T.scripts({
        path: '*.js',
        domain: 'Tribe.MessageHub'
    })
}).to(T.webTargets('../Build/Tribe.MessageHub'));
pack({
    include: T.scripts({
        path: '*.js',
        domain: 'Tribe.SignalR'
    })
}).to(T.webTargets('../Build/Tribe.SignalR'));

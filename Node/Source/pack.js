pack({
    include: T.scripts('Client/*.js'),
    first: 'setup.js'
}).to(T.webTargets('../Build/Client/Tribe.Node.Client'));
sync({
    to: 'Build/Components',
    include: [
        'Composite/Build/*.js',
        'Forms/Build/*.js',
        'SignalR/Client/Build/*.js',
        'Mobile/Build/*.js',
        'PubSub/Build/*.js',
        'Node/Build/*.js'
    ],
    recursive: true
});

sync('MessageHub/Build/Debug/Tribe.SignalR.*.dll').to('Build/Binaries');

zip({
    to: 'Tribe.zip',
    include: 'Build/*.*',
    recursive: true
});

pack([
    T.webDependency('Build/Components/Tribe.Composite'),
    T.webDependency('Build/Components/Tribe.SignalR')
])
.to(T.webTargets('Build/Tribe'));
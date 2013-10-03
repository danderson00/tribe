sync({
    to: 'Build/Components',
    include: [
        'Composite/Build/*.js',
        'Forms/Build/*.js',
        'MessageHub/Client/Build/*.js',
        'Mobile/Build/*.js',
        'PubSub/Build/*.js'
    ],
    recursive: true
});

sync({
    to: 'Build/Binaries',
    include: 'MessageHub/Build/Debug/Tribe.MessageHub.*.dll'
});

zip({
    to: 'Tribe.zip',
    include: 'Build/*.*',
    recursive: true
});

pack([
    T.webDependency('Composite/Build/Tribe.Composite'),
    T.webDependency('MessageHub/Client/Build/Tribe.MessageHub')
])
.to(T.webTargets('Build/Tribe'));
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
    include: 'MessageHub/Build/Debug/*.*'
});

zip({
    to: 'Tribe.zip',
    include: 'Build/*.*',
    recursive: true
});

pack({
    to: 'Build/Tribe.js',
    include: includes()
}); 

pack({
    to: 'Build/Tribe.min.js',
    include: includes('.min')
});

pack({
    to: 'Build/Tribe.chrome.js',
    include: includes('.chrome')
});

function includes(type) {
    return [
        'Composite/Build/Tribe.Composite' + (type || '') + '.js',
        'MessageHub/Client/Build/Tribe.MessageHub' + (type || '') + '.js'
    ];
}
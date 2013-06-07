pack({
    to: 'Tribe.js',
    include: [
        'Composite/Build/Tribe.Composite.js',
        'MessageHub/Client/Build/Tribe.MessageHub.js'
    ]
}); 
pack({
    to: 'Tribe.min.js',
    include: [
        'Composite/Build/Tribe.Composite.js',
        'MessageHub/Client/Build/Tribe.MessageHub.js'
    ],
    minify: true
}); 
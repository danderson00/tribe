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
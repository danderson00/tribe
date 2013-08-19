function includes(chrome) {
    return [
        T.scripts('Dependencies', chrome, 'Tribe.Mobile'),
        T.scripts('Infrastructure', chrome, 'Tribe.Mobile'),
        T.scripts('Binding Handlers', chrome, 'Tribe.Mobile'),
        { files: 'Templates/*.htm', template: { name: 'embedTemplate', data: { component: 'Forms' } } },
        { files: 'Css/*.css', template: { name: 'embedCss', data: { component: 'Forms' } } }
    ];
}

pack({
    to: 'Build/Tribe.Forms.js',
    include: includes(),
});

pack({
    to: 'Build/Tribe.Forms.chrome.js',
    include: includes(true),
});

pack({
    to: 'Build/Tribe.Forms.min.js',
    include: includes(),
    minify: true
});
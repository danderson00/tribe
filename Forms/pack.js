var includes = [
    { files: 'Dependencies/*.js' },
    { files: 'Infrastructure/*.js' },
    { files: 'Binding Handlers/*.js' },
    { files: 'Templates/*.htm', template: { name: 'embedTemplate', data: { component: 'Forms' } } },
    { files: 'Css/*.css', template: { name: 'embedCss', data: { component: 'Forms' } } }
];

pack({
    to: 'Build/Tribe.Forms.desktop.js',
    include: includes,
    exclude: 'Css/mobile.css'
});

pack({
    to: 'Build/Tribe.Forms.mobile.js',
    include: includes,
    exclude: 'Css/desktop.css'
});

pack({
    to: 'Build/Tribe.Forms.desktop.min.js',
    include: includes,
    exclude: 'Css/mobile.css',
    minify: true
});

pack({
    to: 'Build/Tribe.Forms.mobile.min.js',
    include: includes,
    exclude: 'Css/desktop.css',
    minify: true
});
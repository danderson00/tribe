var includes = [
    { files: 'Infrastructure/*.js' },
    { files: 'Css/*.css', template: 'embedCss' },
    T.panes('Panes', 'Mobile', 'Tribe.Mobile')
];

var chrome = [
    { files: 'Infrastructure/*.js', template: [{ name: 'T.script', data: { domain: 'Tribe.Mobile' } }, 'T.chrome']  },
    { files: 'Css/*.css', template: ['embedCss', 'T.chrome'] },
    T.panes.chrome('Panes', 'Mobile', 'Tribe.Mobile')
];

pack({
    to: '../Build/Tribe.Mobile.js',
    include: includes
});

pack({
    to: '../Build/Tribe.Mobile.min.js',
    include: includes,
    minify: true
});

pack({
    to: '../Build/Tribe.Mobile.chrome.js',
    include: chrome
})
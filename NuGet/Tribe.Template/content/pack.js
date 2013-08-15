pack({
    to: 'Build/site.js',
    include: includes(),
    recursive: true
});

pack({
    to: 'Build/site.min.js',
    include: includes(),
    recursive: true,
    minify: true
});

pack({
    to: 'Build/site.chrome.js',
    include: includes(true),
    recursive: true
});

function includes(chrome) {
    return [
        chrome ? T.panes.chrome('Panes') : T.panes('Panes'),
        'Infrastructure/*.js',
        { files: 'Css/*.css', template: 'embedCss' }
    ];
}
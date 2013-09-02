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
        T.panes('Panes', chrome),
        T.scripts('Infrastructure', chrome),
        T.styles('Css')
    ];
}
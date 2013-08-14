pack({
    to: 'Build/site.js',
    include: T.panes('Panes')
});

pack({
    to: 'Build/site.min.js',
    include: T.panes('Panes'),
    minify: true
});

pack({
    to: 'Build/site.chrome.js',
    include: T.panes.chrome('Panes')
});
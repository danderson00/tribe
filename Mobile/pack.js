var includes = [
    { files: 'Source/Binding Handlers/*.js' },
    { files: 'Source/Css/*.css', template: 'embedCss' },
    { files: 'Source/Panes/*.css', template: 'embedCss' },
    { files: 'Source/Panes/*.htm', template: { name: 'embedTemplate', data: { component: 'Mobile' } } },
    { files: 'Source/Panes/*.js', template: { name: 'viewModel', data: { component: 'Mobile' } } }
];

pack({
    to: 'Build/Tribe.Mobile.js',
    include: includes
});

pack({
    to: 'Build/Tribe.Mobile.min.js',
    include: includes,
    minify: true
});
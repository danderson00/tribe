pack([
    {
        to: 'Infrastructure/samples.js',
        include: [
            sample('Tasks'),
            sample('Chat'),
            sample('Mobile')
        ]
    },
    {
        to: 'Build/site.js',
        include: [
            T.scripts('Infrastructure'),
            T.panes('Panes')
        ]
    },
    {
        to: 'Build/site.min.js',
        include: [
            T.scripts('Infrastructure'),
            T.panes('Panes')
        ],
        minify: true
    },
    {
        to: 'Build/site.chrome.js',
        include: [
            T.scripts.chrome('Infrastructure'),
            T.panes.chrome('Panes')
        ]
    },
    {
        to: 'Build/m.js',
        include: [
            T.panes('Panes/Samples')
        ],
        minify: true
    }
]);

function sample(name) {
    return {
        files: 'Panes/Samples/' + name + '/*.*',
        template: { name: 'TR.sampleContent', data: { name: name } },
    };
}
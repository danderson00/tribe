pack({
    to: 'Build/site.js',
    include: [
        'Infrastructure/*.js',
        sample('Tasks'),
        sample('Chat'),
        sample('Mobile')
    ]
});

function sample(name) {
    return {
        files: 'Panes/Samples/' + name + '/*.*',
        template: { name: 'TR.sampleContent', data: { name: name } }
    };
}
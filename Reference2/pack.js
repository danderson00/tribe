pack({
    to: 'Build/sampleContent.js',
    include: [
        sample('Tasks'),
        sample('Chat')
    ]
});

function sample(name) {
    return {
        files: 'Panes/Samples/' + name + '/*.*',
        template: { name: 'TR.sampleContent', data: { name: name } }
    };
}
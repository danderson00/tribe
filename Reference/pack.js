sync([
    '../Build/*.js',
    '../Mobile/Build/*.js',
    '../Forms/Build/*.js'
]).to('Libraries');

pack({
    to: 'Infrastructure/samples.js',
    include: [
        sample('About/Tasks'),
        sample('About/Chat'),
        sample('About/Mobile'),
        sample('Panes/Creating'),
        sample('Panes/Dynamic'),
        sample('Panes/Communicating'),
        sample('Panes/Lifecycle'),
        sample('Panes/Navigating'),
        sample('Webmail/1-Folders'),
        sample('Webmail/2-Mails'),
        sample('Webmail/3-Content'),
        sample('CreditCard/1-Personal'),
        sample('CreditCard/2-Sagas')
    ]
});

pack({
    to: 'Build/site.js',
    include: [
        T.scripts('Infrastructure'),
        T.panes('Panes'),
        T.styles('Css')
    ]
}).to(T.webTargets('Build/site'));

pack({
    to: 'Build/m.js',
    include: T.panes('Panes/Samples'),
    minify: true
});

function sample(name) {
    return {
        files: 'Panes/Samples/' + name + '/*.*',
        template: { name: 'TR.sampleContent', data: { name: name } },
    };
}
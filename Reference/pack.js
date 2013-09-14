sync([
    '../Libraries/*.*',
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
        sample('CreditCard/2-Business'),
        sample('CreditCard/3-Saga'),
        sample('CreditCard/4-Combined')
    ]
});

pack([
        T.scripts('Infrastructure'),
        T.panes('Panes'),
        T.styles('Css')
    ]).to(T.webTargets('Build/site'));

pack({
    to: 'Build/m.js',
    include: T.panes('Panes/Samples'),
    minify: true
});

pack({
    to: 'Build/tests.js',
    include: [
        '../Build/Components/Tests/Tribe.Composite.tests.mockjax.js',
        { files: '../Build/Components/Tests/Tribe.Forms.tests.js', template: TR.testModule('Tribe.Forms') },
        { files: '../Build/Components/Tests/Tribe.Composite.tests.js', template: TR.testModule('Tribe.Composite') },
        { files: '../Build/Components/Tests/Tribe.MessageHub.tests.js', template: TR.testModule('Tribe.MessageHub') },
        { files: '../Build/Components/Tests/Tribe.PubSub.tests.js', template: TR.testModule('Tribe.PubSub') }
    ]
});

function sample(name) {
    return {
        files: 'Panes/Samples/' + name + '/*.*',
        template: { name: 'TR.sampleContent', data: { name: name } },
    };
}
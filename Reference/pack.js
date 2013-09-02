pack(synchroniseDependency('../Build/', 'Tribe'));
pack(synchroniseDependency('../Mobile/Build/', 'Tribe.Mobile'));

pack([
    {
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
            sample('Webmail/3-Content')
        ]
    },
    {
        to: 'Build/site.js',
        include: includes()
    },
    {
        to: 'Build/site.min.js',
        include: includes(),
        minify: true
    },
    {
        to: 'Build/site.chrome.js',
        include: includes(true)
    },
    {
        to: 'Build/m.js',
        include: T.panes('Panes/Samples'),
        minify: true
    }
]);

function includes(debug) {
    return [
        T.scripts('Infrastructure', debug),
        T.panes('Panes', debug),
        T.styles('Css')
    ];
}

function sample(name) {
    return {
        files: 'Panes/Samples/' + name + '/*.*',
        template: { name: 'TR.sampleContent', data: { name: name } },
    };
}

function css() {
    return {
        files: 'Css/*.css',
        template: 'T.style'
    };
}

function synchroniseDependency(path, name) {
    return [
        { to: 'Libraries/' + name + '.js', include: path + name + '.js' },
        { to: 'Libraries/' + name + '.min.js', include: path + name + '.min.js' },
        { to: 'Libraries/' + name + '.chrome.js', include: path + name + '.chrome.js' },
    ];
}
this.component = function (component, platform, outputPath) {
    platform = platform && platforms[platform];
    return [
        {
            to: target('js'),
            include: [
                panes(platform.folder, 'viewModel', 'js'),
                panes('Common', 'viewModel', 'js'),
                scripts('Infrastructure'),
                scripts('Model'),
                scripts('Processes'),
                scripts('Sagas')
            ],
            exclude: platformExcludes(platform, 'js'),
            recursive: true
        },
        {
            to: target('htm'),
            include: [
                panes(platform.folder, 'viewTemplate', 'htm'),
                panes('Common', 'viewTemplate', 'htm'),
                {
                    files: 'Templates/*.htm',
                    template: { name: 'viewTemplate', data: { component: 'Templates' } }
                }
            ],
            exclude: platformExcludes(platform, 'htm'),
            recursive: true
        },
        {
            to: target('css'),
            include: [
                'Panes/' + platform.folder + '/*.css',
                'Panes/Common/*.css',
                'Css/' + platform.folder + '/*.css',
                'Css/Common/*.css'
            ],
            exclude: platformExcludes(platform, 'css'),
            recursive: true
        }
    ];

    function panes(folder, template, extension) {
        return {
            files: 'Panes/' + folder + '/*.' + extension,
            template: { name: template, data: { component: component } }
        };
    }

    function scripts(folder) {
        return {
            files: folder + '/*.js',
            template: { name: 'script', data: { folder: folder, component: component } }
        };
    }

    function target(extension) {
        return outputPath + component + '.' + platform.name + '.' + extension;
    }
};

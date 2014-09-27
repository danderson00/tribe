module.exports = {
    buildTasks: function () {
        return [
            { activity: 'panes', options: { path: 'panes' } },
            { activity: 'scripts', options: { path: 'scripts' } },
            { activity: 'styles', options: { path: 'styles' } }
        ];
    }
};
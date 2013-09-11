pack([
    T.panes(options('Panes')),
    T.scripts(options('Infrastructure')),
    T.styles(options('Css'))
]).to(T.webTargets('../Build/Tribe.Mobile'));

function options(path) {
    return {
        path: path,
        prefix: 'Mobile/',
        domain: 'Tribe.Mobile',
    };
}
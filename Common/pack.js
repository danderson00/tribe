pack([
    T.scripts(options('Source/setup.js')),
    T.scripts(options('Source/logger.js'))
]).to(T.webTargets('Build/Tribe.Common'));

function options(path) {
    return {
        path: path,
        domain: 'Tribe.Common'
    };
}
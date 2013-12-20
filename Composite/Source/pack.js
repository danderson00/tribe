pack([
    'license.js',
    T.webDependency('../../Common/Build/Tribe.Common'),
    T.webDependency('../../PubSub/Build/Tribe.PubSub'),
    T.scripts(options('setup.js')),
    T.scripts(options('options.js')),
    T.scripts(options('Utilities')),
    T.scripts(options('Types')),
    T.scripts(options('Events')),
    T.scripts(options('LoadHandlers')),
    T.scripts(options('LoadStrategies')),
    T.scripts(options('Transitions')),
    T.scripts(options('Api')),
    T.scripts(options('BindingHandlers'))
]).to(T.webTargets('../Build/Tribe.Composite'));
    
function options(path) {
    return {
        path: path,
        domain: 'Tribe.Composite'
    };
}    


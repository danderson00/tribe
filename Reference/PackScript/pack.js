sync('../Libraries/*.*').to('Libraries');
zip('../../Tools/PackScript/*.*').to('PackScript.zip');

pack([
    T.panes('Panes'),
    T.panes({ path: '../Panes/Interface/API', prefix: 'Interface/API' }),
    T.panes('../Panes/Content/Reference/PackScript'),
    
    T.styles('Styles'),
    T.styles('../Css/classes.css'),
    T.styles('../Css/prettify.css')
]).to(
    T.webTargets('Build/site')
);
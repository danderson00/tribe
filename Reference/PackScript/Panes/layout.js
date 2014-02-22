Reference = {};
Article = {
    show: function (section, topic) {
        return function() {
            window.location.hash = "#" + topic.replace('PackScript/', '');
        };
    }
};

T.registerModel(function (pane) {
    this.renderComplete = function() {
        pane.find('pre.example').each(function () {
            $(this).html(PR.prettyPrintOne($(this).html()));
        });
    };

    this.sections = [
        section('Introduction', 'intro'),
        section('Operation', 'operation'),
        section('Packing', 'pack'),
        section('Synchronising', 'sync'),
        section('Compressing', 'zip'),
        section('Including Files', 'includes'),
        section('Templates', 'templates'),
        section('Built-in Templates', 'builtins')
    ];

    this.links = [
        link('Download', 'PackScript.zip'),
        link('GitHub', 'https://github.com/danderson00/PackScript'),
        link('Tests', 'http://danderson00.github.io/PackScript/PackScript.Tests/index.html')
    ];
    
    function section(name, pane) {
        return { name: name, pane: pane };
    }
    
    function link(name, href) {
        return { name: name, href: href };
    }
});
T.Types.Templates = function () {
    var self = this;

    this.store = function (template, path) {
        var id = T.Path(path).asMarkupIdentifier().toString();
        embedTemplate(template, 'template-' + id);
    };
    
    function embedTemplate(template, id) {
        var element = document.createElement('script');
        element.className = '__tribe';
        element.setAttribute('type', 'text/template');
        element.id = id;
        element.text = template;
        document.getElementsByTagName('head')[0].appendChild(element);
    }
    
    this.loaded = function(path) {
        return $('head script#template-' + T.Path(path).asMarkupIdentifier()).length > 0;
    };

    this.render = function (target, path) {
        var id = T.Path(path).asMarkupIdentifier();
        // can't use html() to append - this uses the element innerHTML property and IE7 and 8 will strip comments (i.e. containerless control flow bindings)
        $(target).empty().append($('head script#template-' + id).html());
    };
};
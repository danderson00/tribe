TC.Types.Templates = function () {
    var self = this;

    this.store = function (template, path) {
        var id = TC.Path(path).asMarkupIdentifier().toString();
        var $template = $(template);
        if ($template.is("script"))
            $('head').append($template.filter('script'));
        else
            $('<script type="text/template" class="__tribe" id="template-' + id + '"></script>').text(template).appendTo('head');
    };

    this.loaded = function(path) {
        return $('head script#template-' + TC.Path(path).asMarkupIdentifier()).length > 0;
    };

    this.render = function (target, path) {
        var id = TC.Path(path).asMarkupIdentifier();
        // can't use html() to append - this uses the element innerHTML property and IE7 and 8 will strip comments (i.e. containerless control flow bindings)
        $(target).empty().append($('head script#template-' + id).html());
    };
};
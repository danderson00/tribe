(function() {
    TF.renderTemplate = function (name, target) {
        var rendered = $($('head script#template--Forms-' + name).html());
        $(target).append(rendered);
        return rendered;
    };
})();

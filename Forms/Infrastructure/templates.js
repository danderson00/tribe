TF = window.TF || {};
TF.renderTemplate = function (name, target) {
    $(target).empty().append($('head script#template--Forms-' + name).html());
};
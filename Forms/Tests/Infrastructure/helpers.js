TF.Tests = {
    renderTemplate: function (name, model) {
        var $qunit = $('#qunit-fixture');
        ko.cleanNode($qunit[0]);
        $qunit.append($('#template--' + name).html());
        ko.applyBindings(model, $qunit[0]);
    }
}
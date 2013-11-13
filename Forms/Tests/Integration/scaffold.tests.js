module('Integration.scaffold');

// we only need a really basic test here. TF.scaffold is comprehensively tested.
test("scaffold renders fields from model", function () {
    var model = {
        text: ko.observable(),
        password: ko.observable().extend({ type: 'password' })
    };
    TF.Tests.renderTemplate('scaffold', model);
    equal($('#qunit-fixture .field').length, 2);
    equal($('#qunit-fixture input[type=text]').length, 1);
    equal($('#qunit-fixture input[type=password]').length, 1);
});
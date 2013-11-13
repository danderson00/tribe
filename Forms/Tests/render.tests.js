module('render');

test("template is rendered", function() {
    TF.render('text', $('<div/>').appendTo('#qunit-fixture'), { value: '' });
    equal($('#qunit-fixture .field').length, 1);
    equal($('#qunit-fixture .label').length, 1);
    equal($('#qunit-fixture .display').length, 1);
});

test("observables are bound", function () {
    var value = ko.observable('test');
    TF.render('text', $('<div/>').appendTo('#qunit-fixture'), { value: value });
    var input = $('#qunit-fixture input');
    equal(input.val(), 'test');
    value('test2');
    equal(input.val(), 'test2');
    input.val('test3').change();
    equal(value(), 'test3');
});

test("id attribute of input element is set if specified", function() {
    TF.render('text', '#qunit-fixture', { value: '', id: 'testid' });
    equal($('#testid').length, 1);
});
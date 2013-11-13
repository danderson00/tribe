module('scaffold');

test("properties are rendered as text fields by default", function() {
    TF.scaffold({ test: ko.observable('value') }).to('#qunit-fixture');
    equal($('#qunit-fixture input').val(), 'value');
    equal($('#qunit-fixture .label').text().trim(), 'test');
});

test("multiple properties are rendered", function() {
    TF.scaffold({
        test: ko.observable('value'),
        test2: ko.observable('value2')
    }).to('#qunit-fixture');
    equal($('#qunit-fixture input:eq(0)').val(), 'value');
    equal($('#qunit-fixture input:eq(1)').val(), 'value2');
});

test("displayText can be specified in displayText extension", function() {
    TF.scaffold({
        test: ko.observable().extend({ displayText: 'displayText' })
    }).to('#qunit-fixture');
    equal($('#qunit-fixture .label span').text(), 'displayText');
});

test("template type can be specified in type extension", function () {
    TF.scaffold({
        test: ko.observable().extend({ type: 'password' })
    }).to('#qunit-fixture');
    equal($('#qunit-fixture input[type=password]').length, 1);
});

test("select template is rendered correctly from scaffold", function () {
    var list = [
        { value: 1, display: 'one' },
        { value: 2, display: 'two' },
        { value: 3, display: 'three' }
    ];
    var target = { test: ko.observable(list[2]).extend({ type: 'select', listSource: list, displayProperty: 'display' }) };
    TF.scaffold(target).to('#qunit-fixture');
    equal($('#qunit-fixture option:selected').text(), 'three');
    equal($('#qunit-fixture option').length, 3);
    equal($('#qunit-fixture option:eq(1)').text(), 'two');
});
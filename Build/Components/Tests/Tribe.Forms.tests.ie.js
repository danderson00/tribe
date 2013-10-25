// Infrastructure/helpers.js
TF.Tests = {
    renderTemplate: function(name, model) {
        var $qunit = $('#qunit-fixture');
        ko.cleanNode($qunit[0]);
        $qunit.append($('#template--' + name).html());
        ko.applyBindings(model, $qunit[0]);
    }
};
// fields.tests.js
(function () {
    var model;
    var list = [
        { value: 1, text: 'One' },
        { value: 2, text: 'Two' },
        { value: 3, text: 'Three' }
    ];

    module('fields', {
        setup: function () {
            model = createModel();
            TF.Tests.renderTemplate('fields', model);
        }
    });

    test("Labels are rendered correctly", function () {
        expect(8);
        $.each($('.label span'), function () {
            equal($(this).text(), 'label');
        });
    });

    test("Existing values are rendered correctly", function () {
        equal(getDisplay(0, 'span').html(), 'value');
        equal(getDisplay(1, 'input').val(), 'text');
        equal(getDisplay(2, 'input').val(), '01/01/2001');
        equal(getDisplay(3, 'input').val(), 'password');
        equal(getDisplay(4, 'select').val(), '2');
        equal(getDisplay(5, 'select option:checked').text(), 'Two');
        equal(getDisplay(6, 'input:checked').val(), '2');
        equal(getDisplay(7, 'input').is(':checked'), true);
    });

    test("Model values are updated", function () {
        getDisplay(1, 'input').val('new').change();
        getDisplay(2, 'input').val('02/02/2002').change();
        getDisplay(3, 'input').val('abc123').change();
        getDisplay(4, 'select').val('3').change();
        getDisplay(5, 'select').prop('selectedIndex', 2).change();
        getDisplay(6, 'input:eq(2)').click().click(); // not sure, but it works...
        getDisplay(7, 'input').click();

        equal(model.text(), 'new');
        equal(model.date(), '02/02/2002');
        equal(model.password(), 'abc123');
        equal(model.simpleSelect(), '3');
        equal(model.objectSelect(), list[2]);
        equal(model.radio(), '3');
        equal(model.boolean(), false);
    });

    test("Displayed values are updated", function () {
        model.display('new');
        model.text('new');
        model.date('02/02/2002');
        model.password('abc123');
        model.simpleSelect('3');
        model.objectSelect(list[2]);
        model.radio('3');
        model.boolean(false);

        equal(getDisplay(0, 'span').html(), 'new');
        equal(getDisplay(1, 'input').val(), 'new');
        equal(getDisplay(2, 'input').val(), '02/02/2002');
        equal(getDisplay(3, 'input').val(), 'abc123');
        equal(getDisplay(4, 'select').val(), '3');
        equal(getDisplay(5, 'select option:checked').text(), 'Three');
        equal(getDisplay(6, 'input:checked').val(), '3');
        equal(getDisplay(7, 'input').is(':checked'), false);
    });

    function getDisplay(index, tag) {
        return $('#qunit-fixture .field:eq(' + index + ') .display ' + tag);
    }

    function createModel() {
        return {
            display: ko.observable('value'),
            text: ko.observable('text'),
            date: ko.observable('01/01/2001'),
            password: ko.observable('password'),
            simpleSelect: ko.observable('2'),
            objectSelect: ko.observable(list[1]),
            radio: ko.observable('2'),
            boolean: ko.observable(true),
            list: list
        };
    };
})();

// forms.tests.js
(function () {
    var model;
    
    module('forms', {
        setup: function () {
            model = {
                data: { text: ko.observable('test') }
            };
            TF.Tests.renderTemplate('forms', model);
        }
    });

    test("Existing field renders", function () {
        equal($('.existing input').val(), 'test');
    });
    
    test("properties are created on existing objects in create mode", function() {
        equal(model.data.text2(), 'test');
    });

    test("objects are created on existing objects in create mode", function() {
        equal(model.data.created.text3(), 'test');
    });
    
    test("new objects are created", function () {
        expect(2);
        $('#testButton').click();
        window.testCreatedObject = undefined;
    });

    window.testCreatedObject = function (model) {
        equal(model.text4(), 'test');
        equal(model.text5.text6(), 'test');
    };

})();

// Utils.tests.js
(function () {
    module('Utils');

    var utils = TF.Utils;

    test("evaluateProperty", function () {
        var target = {
            test1: {
                test11: 'test',
                test12: {
                    test121: 'test'
                }
            },
            test2: 'test'
        };

        equal(utils.evaluateProperty(target, 'test3'), undefined);
        equal(utils.evaluateProperty(target, 'test3.test4'), undefined);
        equal(utils.evaluateProperty(target, 'test1.test4'), undefined);
        equal(utils.evaluateProperty(target, ''), target);
        equal(utils.evaluateProperty(target, 'test1'), target.test1);
        equal(utils.evaluateProperty(target, 'test2'), 'test');
        equal(utils.evaluateProperty(target, 'test1.test11'), 'test');
        equal(utils.evaluateProperty(target, 'test1.test12.test121'), 'test');
        equal(utils.evaluateProperty(target, '.test1'), target.test1);
        equal(utils.evaluateProperty(target, 'test1.'), target.test1);
        equal(utils.evaluateProperty(target, 'test1..test11'), 'test');

        var container = {};
        equal(utils.evaluateProperty(target, 'test3', container), container);
        equal(target.test3, container);
        utils.evaluateProperty(target, 'test3.test4', 'test');
        equal(target.test3.test4, 'test');

        utils.evaluateProperty(target, 'test4.test5.test6', 'test');
        equal(target.test4.test5.test6, 'test');
    });
})();

//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('<div data-bind="display: display, displayText: \'label\'"></div>\n<div data-bind="textField: text, displayText: \'label\'"></div>\n<div data-bind="dateField: date, displayText: \'label\'"></div>\n<div data-bind="passwordField: password, displayText: \'label\'"></div>\n<div data-bind="selectField: simpleSelect, displayText: \'label\', items: [\'1\', \'2\', \'3\']"></div>\n<div data-bind="selectField: objectSelect, displayText: \'label\', items: list, optionsText: \'text\'"></div>\n<div data-bind="radioField: radio, displayText: \'label\', items: [\'1\', \'2\', \'3\']"></div>\n<div data-bind="booleanField: boolean, displayText: \'label\'"></div>\n', 'template--fields');//
window.__appendTemplate('<div class="existing" data-bind="form: data">\n    <div data-bind="textField: text"></div>\n</div>\n\n<div class="createProperties" data-bind="form: data, create: true">\n    <div data-bind="textField: \'text2\', defaultValue: \'test\'"></div>    \n</div>\n\n<div class="createObject" data-bind="form: \'data.created\', create: true">\n    <div data-bind="textField: \'text3\', defaultValue: \'test\'"></div>        \n</div>\n\n<div class="newObject" data-bind="form: {}, create: true">\n    <div data-bind="textField: \'text4\', defaultValue: \'test\'"></div>\n    <div data-bind="textField: \'text5.text6\', defaultValue: \'test\'"></div>\n    <button id="testButton" data-bind="click: testCreatedObject"></button>\n</div>', 'template--forms');
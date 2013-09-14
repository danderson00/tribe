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

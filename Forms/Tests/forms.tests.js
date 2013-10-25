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

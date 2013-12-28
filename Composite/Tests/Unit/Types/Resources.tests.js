(function() {
    var models;

    module('Unit.Types.Resources', {
        setup: function () { models = new TC.Types.Resources(); }
    });

    test("register stores model as property with constructor and options", function () {
        var constructor = function () { };
        var options = {};
        models.register('test', constructor, options);
        equal(models.test.constructor, constructor);
        equal(models.test.options, options);
    });
})();
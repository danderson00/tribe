(function () {
    var context;
    var node;
    
    module("Unit.Events.createModel", {
        setup: function () {
            context = Test.Unit.context();
            pane = Test.Unit.node().pane;
        }
    });

    test("model is created from stored constructor", function () {
        T.Events.createModel(pane, context);
        ok(context.models.test.constructor.calledOnce);
    });

    test("default model is created if no constructor defined", function () {
        context.models.test.constructor = null;
        T.Events.createModel(pane, context);
        equal(pane.model.pane, pane);
    });
})();
(function () {
    var node;
    var context;

    module("Unit.Events.renderPane", {
        setup: function () {
            context = Test.Unit.context();
            pane = Test.Unit.node().pane;
            context.setTemplate('<div/>');
        }
    });

    test("templates.render is called with identifier and element", function () {
        TC.Events.renderPane(pane, context);
        ok(context.templates.render.calledOnce);
        ok(context.templates.render.calledWithExactly(pane.element, 'test'));
    });

    test("paneRendered function is called on the model", function () {
        TC.Events.renderPane(pane, context);
        ok(pane.model.paneRendered.calledOnce);
    });
})();
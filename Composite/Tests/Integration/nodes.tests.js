(function () {
    module('Integration.nodes');

    test("createNode binds pane to target element", function() {
        TC.createNode('#qunit-fixture', { path: 'Utilities/parent' });
        equal($('#qunit-fixture .parent .child .message').text(), 'test message');
    });

    test("appendNode appends wrapped pane to target element", function() {
        TC.appendNode('#qunit-fixture', { path: 'Utilities/parent' });
        equal($('#qunit-fixture div .parent .child .message').text(), 'test message');
    });

    test("createNode called from paneRendered model function renders", function() {
        TC.createNode('#qunit-fixture', { path: 'Utilities/dynamicParent' });
        equal($('#qunit-fixture .dynamicParent .child .message').text(), 'test message');
    });

    test("createNode inherits context from parent element", function () {
        TC.Events.spy = sinon.spy();
        TC.options.events = ['loadResources', 'createModel', 'initialiseModel', 'renderPane', 'renderComplete', 'spy', 'active', 'dispose'];
        
        TC.createNode('#qunit-fixture', { path: 'Utilities/dynamicParent' });
        ok(TC.Events.spy.calledTwice);
        equal(TC.Events.spy.firstCall.args[1], TC.Events.spy.secondCall.args[1]);
    });

    test("createNode returns populated Node object", function() {
        var node = TC.createNode('#qunit-fixture', { path: 'Utilities/parent' });
        equal(node.pane.path, '/Utilities/parent');
        equal(node.children.length, 1);
    });

    asyncTest("context.renderOperation resolves when render operation is complete", function () {
        expect(1);
        TC.options.synchronous = false;
        var context = TC.context();
        TC.createNode('#qunit-fixture', { path: 'Utilities/parent' }, null, context);
        $.when(context.renderOperation.promise)
            .done(function() {
                equal($('#qunit-fixture .parent .child .message').text(), 'test message');
                start();
            });
    });

    asyncTest("context.renderOperation includes dynamically added nodes", function () {
        expect(1);
        TC.options.synchronous = false;
        var context = TC.context();
        TC.createNode('#qunit-fixture', { path: 'Utilities/dynamicParent' }, null, context);
        $.when(context.renderOperation.promise)
            .done(function () {
                equal($('#qunit-fixture .dynamicParent .child .message').text(), 'test message');
                start();
            });
    });
})();

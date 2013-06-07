(function() {
    module('Integration.bindingHandler', {
        setup: function() {
            TC.Events.spy = sinon.spy();
            TC.options.events = ['spy'];
        }
    });

    test("pane path is set from string binding value", function() {
        executeHandler({ value: 'test' });
        equal(pane().path, '/test');
    });

    test("pane properties are set from object binding value", function() {
        executeHandler({ value: { path: 'test', data: 'test2' } });
        equal(pane().path, '/test');
        equal(pane().data, 'test2');
    });

    test("pane data is set from other binding value", function() {
        executeHandler({ otherValues: { data: 'data' } });
        equal(pane().data, 'data');
    });

    test("pane element is set from element argument", function() {
        executeHandler({ element: '#qunit-fixture' });
        equal(pane().element, $('#qunit-fixture')[0]);
    });

    test("parent node is extracted from bindingContext", function () {
        var parentNode = Test.Unit.node();
        executeHandler({ bindingContext: { $root: { __node: parentNode } } });
        equal(pane().node.parent, parentNode);
    });

    function executeHandler(values) {
        values = values || {};
        return ko.bindingHandlers.pane.init(
            values.element,
            accessor(values.value || ''),
            accessor(values.otherValues || {}),
            values.viewModel,
            values.bindingContext || {});
    }
    
    function accessor(value) {
        return function() { return value; };
    }
    
    function pane() {
        return TC.Events.spy.firstCall.args[0];
    }
})();
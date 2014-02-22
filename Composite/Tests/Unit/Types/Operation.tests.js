(function () {
    var operation;
    
    module("Unit.Types.Operation", {
        setup: function() { operation = new T.Types.Operation(); }
    });

    test("operation resolves when single child completes", function () {
        operation.add(1);
        equal(operation.promise.state(), 'pending');
        operation.complete(1);
        equal(operation.promise.state(), 'resolved');
    });

    test("operation resolves when two children complete", function() {
        operation.add(1);
        operation.add(2);
        operation.complete(1);
        equal(operation.promise.state(), 'pending');
        operation.complete(2);
        equal(operation.promise.state(), 'resolved');
    });
})();

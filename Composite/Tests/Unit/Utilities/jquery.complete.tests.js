(function () {
    var deferreds;

    module("Unit.Utilities.jquery.complete", {
        setup: function() { deferreds = [ $.Deferred(), $.Deferred() ]; }
    });

    test("complete resolves when at least one deferred resolves", function () {
        var result = $.complete(deferreds);
        equal(result.state(), 'pending');
        deferreds[0].reject();
        equal(result.state(), 'pending');
        deferreds[1].resolve();
        equal(result.state(), 'resolved');
    });

    test("complete rejects when all passed deferreds reject", function () {
        var result = $.complete(deferreds);
        equal(result.state(), 'pending');
        deferreds[0].reject();
        equal(result.state(), 'pending');
        deferreds[1].reject();
        equal(result.state(), 'rejected');
    });
})();

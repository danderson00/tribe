module('serializer');

test("extractMetadata adds observables to metadata", function () {
    var result = T.serializer.extractMetadata({
        p1: 1,
        p2: ko.observable(2),
        p3: ko.observableArray()
    });
    deepEqual(result.metadata.observables, ['p2', 'p3']);
});

test("extractMetadata resolves observables on target", function () {
    var result = T.serializer.extractMetadata({
        p1: 1,
        p2: ko.observable(2),
        p3: ko.observableArray()
    });
    equal(result.target.p2, 2);
    deepEqual(result.target.p3, []);
});

test("applyMetadata converts target values to observables", function () {
    var result = T.serializer.applyMetadata({
        p1: 1,
        p2: 2,
        p3: [3]
    }, { observables: ['p2', 'p3'] });
    ok(ko.isObservable(result.p2));
    ok(ko.isObservable(result.p3));
    ok(result.p3.push);
    equal(result.p1, 1);
    equal(result.p2(), 2);
    equal(result.p3()[0], 3);
});
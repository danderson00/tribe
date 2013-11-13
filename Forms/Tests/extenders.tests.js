module('extenders');

test("Extending observables sets metadata", function() {
    var observable = ko.observable().extend({
        listSource: 'listSource',
        type: 'type',
        displayText: 'displayText'
    });
    equal(observable.metadata.listSource, 'listSource');
    equal(observable.metadata.type, 'type');
    equal(observable.metadata.displayText, 'displayText');
});
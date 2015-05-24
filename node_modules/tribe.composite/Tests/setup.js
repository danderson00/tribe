Test = {
    Unit: {},
    Integration: {},
    state: {}
};

Test.defaultOptions = function() {
    return {
        synchronous: true,
        handleExceptions: false,
        basePath: 'Integration/Panes/',
        loadStrategy: 'adhoc',
        events: T.defaultOptions().events,
        defaultUrlProvider: T.options.defaultUrlProvider
    };
};
T.options = Test.defaultOptions();


QUnit.testDone(function () {
    ko.cleanNode(document.getElementById('qunit-fixture'));
    Test.state = {};
    T.options = Test.defaultOptions();
});

T.history.dispose();

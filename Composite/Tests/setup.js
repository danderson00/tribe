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
        events: TC.defaultOptions().events,
        defaultUrlProvider: TC.options.defaultUrlProvider
    };
};
TC.options = Test.defaultOptions();


QUnit.testDone(function () {
    ko.cleanNode(document.getElementById('qunit-fixture'));
    Test.state = {};
    TC.options = Test.defaultOptions();
});

TC.history.dispose();
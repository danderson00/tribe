Test = {
    Unit: {},
    Integration: {},
    state: {}
};

Test.defaultOptions = function() {
    return {
        synchronous: true,
        splitScripts: true,
        handleExceptions: false,
        basePath: 'Integration/Panes/',
        loadStrategy: 'adhoc',
        events: TC.defaultOptions().events
    };
};
TC.options = Test.defaultOptions();

sinon.spy(ko, 'applyBindings');

QUnit.testDone(function () {
    $('.__tribe').remove();
    Test.state = {};
    TC.options = Test.defaultOptions();
    ko.applyBindings.reset();
});

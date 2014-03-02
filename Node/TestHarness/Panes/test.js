T.registerModel(function (pane) {
    var self = this,
        test = pane.data;

    this.test = test;
    this.pass = test.failed === 0;
    this.result = this.pass ? 
        'Passed (' + test.total + ')' :
        'Failed (' + test.failed + '/' + test.total + ')';

    this.showAssertions = ko.observable(this.pass !== true);

    this.toggleAssertions = function () {
        self.showAssertions(!self.showAssertions());
    };

    this.formatAssertion = function (assertion) {
        var description = '';
        if (assertion.message)
            description += assertion.message.replace(/\n/g, '<br/>');
        else
            description += assertion.result ? 'Passed' : 'Failed';
        if (assertion.expected)
            description += '<br/>Expected: ' + JSON.stringify(assertion.expected, null, 2);
        if (assertion.actual && !assertion.result)
            description += '<br/>Actual: ' + JSON.stringify(assertion.actual, null, 2);
        return description;
    };
});
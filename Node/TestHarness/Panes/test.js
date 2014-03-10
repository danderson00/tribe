T.registerModel(function (pane) {
    var self = this,
        test = pane.data;

    this.test = test;
    this.pass = test.state === 'passed';
    this.fail = test.state === 'failed';
    this.details = 'Filename: ' + test.filename + (test.error ? '<br/>' + test.error : '').replace(/\n/g, '<br/>');
    this.fixture = test.fixture ?
        test.fixture.join('.') :
        'No fixture';

    this.showDetails = ko.observable(this.pass !== true);

    this.toggleDetails = function () {
        self.showDetails(!self.showDetails());
    };

});
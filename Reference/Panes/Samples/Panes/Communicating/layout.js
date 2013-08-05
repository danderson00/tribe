TC.registerModel(function (pane) {
    // Create an observable to share between child panes
    this.observable = ko.observable('Test');
});
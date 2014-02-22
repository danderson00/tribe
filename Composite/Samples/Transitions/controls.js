T.registerModel(function(pane) {
    var self = this;
    var target = 1;
    this.transition = ko.observable('fade');    

    this.execute = function () {
        target = target % 3 + 1;
        T.transition(T.nodeFor('.target'), self.transition()).to('target' + target);
    };
});
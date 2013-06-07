TC.registerModel(function(pane) {
    var self = this;
    var target = 1;
    this.transition = ko.observable('fade');    

    this.execute = function () {
        target = target % 3 + 1;
        TC.transition(TC.Utils.nodeFor('.target'), self.transition()).to('target' + target);
    };
});
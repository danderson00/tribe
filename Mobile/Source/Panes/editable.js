TC.registerModel(function (pane) {
    var self = this;
    var data = pane.data || {};
    
    this.initialText = data.initialText;    
    this.newValue = ko.observable();
    this.editing = ko.observable(false);

    this.startEditing = function() {
        self.editing(true);
        $(pane.element).find('input').focus();
    };

    this.save = function() {
        if ($.isFunction(data.callback))
            data.callback(self.newValue());
        self.editing(false);
    };

    this.cancel = function() {
        self.editing(false);
    };
});
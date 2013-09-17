TC.registerModel(function (pane) {
    var self = this;
    
    this.email = ko.observable().extend({ email: 'This' });
    this.comments = ko.observable().extend({ required: true });
    this.success = ko.observable();
    
    this.paneRendered = function() {
        $('<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>')
            .insertAfter(pane.find('.twitter-mention-button'));
    };

    this.submit = function() {
        $.post('Feedback/Send', {
            url: window.location.href,
            email: self.email(),
            content: self.comments()
        }).done(done).fail(fail);
    };

    this.close = function() {
        pane.remove();
    };
    
    function done() {
        self.success(true);
        setTimeout(self.close, 3000);
    }
    
    function fail() {
        self.success(false);
    }
});
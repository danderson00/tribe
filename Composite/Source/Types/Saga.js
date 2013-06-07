TC.Types.Saga = function (pane, handlers, initialData) {
    var self = this;
    
    this.pubsub = pane.pubsub.createLifetime();
    this.pane = pane;
    this.data = initialData || {};
    this.children = [];

    handlers = $.extend({}, handlers);
    var startHandler = handlers.onstart;
    delete handlers.onstart;
    var endHandler = handlers.onend;
    delete handlers.onend;

    this.start = function() {
        $.each(handlers, attachHandler);
        if(startHandler) startHandler(self, initialData);
        return self;
    };
    
    function attachHandler(topic, handler) {
        self.pubsub.subscribe(topic, messageHandlerFor(handler));
    }
    
    function messageHandlerFor(handler) {
        return function(messageData, envelope) {
            handler(self, messageData, envelope);
        };
    }

    this.startChild = function(childHandlers, childData) {
        self.children.push(new TC.Types.Saga(pane, childHandlers, childData).start());
    };

    this.end = function () {
        if (endHandler) endHandler(self);        
        self.pubsub.end();
        $.each(self.children, function(index, child) {
            child.end();
        });
    };
};
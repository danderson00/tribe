T.Types.Navigation = function (node, options) {
    normaliseOptions();
    setInitialPaneState();

    var stack = [initialStackItem()];
    var currentFrame = 0;

    this.node = node;
    this.stack = stack;

    this.navigate = function (paneOptions) {
        if (options.browser)
            T.history.navigate(options.browser && options.browser.urlDataFrom(paneOptions));

        trimStack();
        stack.push(paneOptions);
        currentFrame++;

        navigateTo(paneOptions);
    };

    this.isAtStart = function() {
        return currentFrame === 0;
    };

    this.go = function(frameCount) {
        go(frameCount);
        if (options.browser) T.history.update(frameCount);
    };
    
    if(options.browser) T.Utils.handleDocumentEvent('browser.go', onBrowserGo);
    function onBrowserGo(e) {
        go(e.eventData.count);
    }

    function go(frameCount) {
        var newFrame = currentFrame + frameCount;
        if (newFrame < 0) newFrame = 0;
        if (newFrame >= stack.length) newFrame = stack.length - 1;

        if (newFrame != currentFrame)
            navigateTo(stack[newFrame], frameCount < 0);

        currentFrame = newFrame;
    }

    function navigateTo(paneOptions, reverse) {
        T.Utils.raiseDocumentEvent('navigating', { node: node, options: paneOptions, browserData: options.browserData });
        node.transitionTo(paneOptions, options.transition, reverse);
    }

    function trimStack() {
        stack.splice(currentFrame + 1, stack.length);
    }

    this.dispose = function() {
        T.Utils.detachDocumentEvent('browser.go', onBrowserGo);
    };
    
    function normaliseOptions() {
        options = options || {};
        if (options.constructor === String)
            options = { transition: options };
        if (options.browser === true)
            options.browser = T.options.defaultUrlProvider;
    }
    
    function setInitialPaneState() {
        var query = window.location.href.match(/\#.*/);
        if (query) query = query[0].substring(1);
        var urlState = options.browser && options.browser.paneOptionsFrom(query);
        if (urlState) {
            node.pane.path = urlState.path;
            node.pane.data = urlState.data;
        }
    }
    
    function initialStackItem() {
        return { path: node.pane.path, data: node.pane.data };
    }
};
TC.Types.Navigation = function (node, options) {
    normaliseOptions();
    setInitialPaneState();

    var stack = [initialStackItem()];
    var currentFrame = 0;

    this.node = node;
    this.stack = stack;

    this.navigate = function (paneOptions) {
        if (options.browser)
            TC.history.navigate(options.browser && options.browser.urlDataFrom(paneOptions));

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
        if (options.browser) TC.history.update(frameCount);
    };
    
    if(options.browser) TC.Utils.handleDocumentEvent('browser.go', onBrowserGo);
    function onBrowserGo(e) {
        go(e.data.count);
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
        TC.Utils.raiseDocumentEvent('navigating', { node: node, options: paneOptions, browserData: options.browserData });
        node.transitionTo(paneOptions, options.transition, reverse);
    }

    function trimStack() {
        stack.splice(currentFrame + 1, stack.length);
    }

    this.dispose = function() {
        document.removeEventListener('browser.go', onBrowserGo);
    };
    
    function normaliseOptions() {
        options = options || {};
        if (options.constructor === String)
            options = { transition: options };
        if (options.browser === true)
            options.browser = TC.options.defaultUrlProvider;
    }
    
    function setInitialPaneState() {
        var urlState = options.browser && options.browser.paneOptionsFrom(window.location.search);
        if (urlState) {
            node.pane.path = urlState.path;
            node.pane.data = urlState.data;
        }
    }
    
    function initialStackItem() {
        return { path: node.pane.path, data: node.pane.data };
    }
};
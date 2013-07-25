TC.Types.Navigation = function (node, options) {
    options = options || {};
    if (options.constructor === String)
        options = { transition: options };

    var stack = [{ path: node.pane.path, data: node.pane.data }];
    var currentFrame = 0;

    this.node = node;
    this.stack = stack;

    this.navigate = function (paneOptions) {
        if (options.browser)
            TC.history.navigate(paneOptions, options.browser);

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
    
    if(options.browser) document.addEventListener('browser.go', onBrowserGo);
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
};
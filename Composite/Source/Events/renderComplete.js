TC.Events.renderComplete = function (pane, context) {
    $.when(TC.transition(pane, null, pane.reverseTransitionIn).in()).done(executeRenderComplete);
    setTimeout(function() {
        pane.endRender();
    });

    function executeRenderComplete() {
        if (pane.model.renderComplete)
            pane.model.renderComplete();
        pane.is.rendered.resolve();
        TC.Utils.raiseDocumentEvent('renderComplete', pane);
        context.renderOperation = new TC.Types.Operation();
    }
};
﻿(function () {
    var utils = T.Utils;

    utils.getPaneOptions = function(value, otherOptions) {
        var options = value.constructor === String ? { path: value } : value;
        return $.extend({}, otherOptions, options);
    };

    utils.bindPane = function (node, element, paneOptions, context) {
        context = context || utils.contextFor(element) || T.context();
        var pane = new T.Types.Pane($.extend({ element: $(element)[0] }, paneOptions));
        node.setPane(pane);

        context.renderOperation.add(pane);

        var pipeline = new T.Types.Pipeline(T.Events, context);
        pipeline.execute(context.options.events, pane);

        return pane;
    };

    utils.insertPaneAfter = function (node, target, paneOptions, context) {
        var element = $('<div/>').insertAfter(target);
        return utils.bindPane(node, element, paneOptions, context);
    };
})();

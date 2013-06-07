(function () {
    var utils = TC.Utils;

    TC.bindPane = function(node, element, paneOptions, context) {
        context = context || utils.contextFor(element) || TC.context();
        var pane = new TC.Types.Pane($.extend({ element: $(element)[0] }, paneOptions));
        node.setPane(pane);

        context.renderOperation.add(pane);

        var pipeline = new TC.Types.Pipeline(TC.Events, context);
        pipeline.execute(context.options.events, pane);

        return pane;
    };

    TC.appendPane = function(node, target, paneOptions, context) {
        var element = $('<div/>').appendTo(target);
        return TC.bindPane(node, element, paneOptions, context);
    };

    TC.insertPaneAfter = function(node, target, paneOptions, context) {
        var element = $('<div/>').insertAfter(target);
        return TC.bindPane(node, element, paneOptions, context);
    };

    TC.createNode = function (element, paneOptions, parentNode, context) {
        parentNode = parentNode || utils.nodeFor(element);
        context = context || utils.contextFor(element) || TC.context();

        var node = new TC.Types.Node(parentNode);
        TC.bindPane(node, element, paneOptions, context);

        return node;
    };

    TC.appendNode = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').appendTo(target);
        return TC.createNode(element, paneOptions, parentNode, context);
    };

    TC.insertNodeAfter = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').insertAfter(target);
        return TC.createNode(element, paneOptions, parentNode || utils.nodeFor(target), context);
    };
})();

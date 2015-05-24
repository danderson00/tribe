(function () {
    var utils = T.Utils;

    T.createNode = function (element, paneOptions, parentNode, context) {
        parentNode = parentNode || T.nodeFor(element);
        context = context || utils.contextFor(element) || T.context();

        var node = new T.Types.Node(parentNode);
        utils.bindPane(node, element, paneOptions, context);

        return node;
    };

    T.appendNode = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').appendTo(target);
        return T.createNode(element, paneOptions, parentNode, context);
    };

    T.insertNodeAfter = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').insertAfter(target);
        return T.createNode(element, paneOptions, parentNode || T.nodeFor(target), context);
    };

    T.nodeFor = function (element) {
        return element && T.Utils.extractNode(ko.contextFor($(element)[0]));
    };
})();

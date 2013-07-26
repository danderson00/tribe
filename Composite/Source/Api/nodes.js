(function () {
    var utils = TC.Utils;

    TC.createNode = function (element, paneOptions, parentNode, context) {
        parentNode = parentNode || TC.nodeFor(element);
        context = context || utils.contextFor(element) || TC.context();

        var node = new TC.Types.Node(parentNode);
        utils.bindPane(node, element, paneOptions, context);

        return node;
    };

    TC.appendNode = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').appendTo(target);
        return TC.createNode(element, paneOptions, parentNode, context);
    };

    TC.insertNodeAfter = function (target, paneOptions, parentNode, context) {
        var element = $('<div/>').insertAfter(target);
        return TC.createNode(element, paneOptions, parentNode || TC.nodeFor(target), context);
    };

    TC.nodeFor = function (element) {
        return element && TC.Utils.extractNode(ko.contextFor($(element)[0]));
    };
})();

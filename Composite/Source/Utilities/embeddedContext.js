﻿(function() {
    T.Utils.embedState = function (model, context, node) {
        embedProperty(model, 'context', context);
        embedProperty(model, 'node', node);
    };

    T.Utils.contextFor = function (element) {
        return element && T.Utils.extractContext(ko.contextFor($(element)[0]));
    };

    T.Utils.extractContext = function (koBindingContext) {
        return koBindingContext && embeddedProperty(koBindingContext.$root, 'context');
    };

    T.Utils.extractNode = function (koBindingContext) {
        return koBindingContext && embeddedProperty(koBindingContext.$root, 'node');
    };

    function embedProperty(target, key, value) {
        if (!target)
            throw "Can't embed property in falsy value";
        target['__' + key] = value;
    }

    function embeddedProperty(target, key) {
        return target && target['__' + key];
    }
})();

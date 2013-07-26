(function() {
    TC.Utils.embedState = function (model, context, node) {
        embedProperty(model, 'context', context);
        embedProperty(model, 'node', node);
    };

    TC.Utils.contextFor = function (element) {
        return element && TC.Utils.extractContext(ko.contextFor($(element)[0]));
    };

    TC.Utils.extractContext = function (koBindingContext) {
        return koBindingContext && embeddedProperty(koBindingContext.$root, 'context');
    };

    TC.Utils.extractNode = function (koBindingContext) {
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

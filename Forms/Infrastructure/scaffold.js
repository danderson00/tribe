TF.scaffold = function(source) {
    return {
        to: function(element) {
            for (var property in source)
                if (source.hasOwnProperty(property) && ko.isObservable(source[property])) {
                    var value = source[property];
                    var metadata = value.metadata || {};
                    TF.render(metadata.type || 'text', element, {
                        value: value,
                        displayText: metadata.displayText || property,
                        items: metadata.listSource,
                        optionsText: metadata.displayProperty
                    });
                }
        }
    };
};
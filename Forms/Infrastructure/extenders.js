(function () {
    addMetadataExtender('type');
    addMetadataExtender('displayText');
    addMetadataExtender('listSource');
    addMetadataExtender('displayProperty');

    function addMetadataExtender(name) {
        ko.extenders[name] = function(target, value) {
            target.metadata = target.metadata || {};
            target.metadata[name] = value;
            return target;
        };
    }
})();

(function () {
    // adds setWithoutValidation to observables
    var oldExtender = ko.extenders['validatable'];
    ko.extenders['validatable'] = function (observable, enable) {
        oldExtender(observable, enable);
        observable.setWithoutValidation = setWithoutValidation;
    };

    function setWithoutValidation(value) {
        var rules = observable.rules();
        observable.rules([]);
        observable(value);
        observable.isModified(false);
        observable.rules(rules);
    }
})();
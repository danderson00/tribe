(function () {
    module('Unit.Utilities.idGenerator');

    test("idGenerator starts at 0 and generates sequential numbers", function () {
        var generator = T.Utils.idGenerator();
        equal(generator.next(), 0);
        equal(generator.next(), 1);
        equal(generator.next(), 2);
        equal(generator.next(), 3);
        equal(generator.next(), 4);
    });

    test("getUniqueId is a static generator", function() {
        equal(T.Utils.getUniqueId(), 0);
        equal(T.Utils.getUniqueId(), 1);
        equal(T.Utils.getUniqueId(), 2);
    });
})();

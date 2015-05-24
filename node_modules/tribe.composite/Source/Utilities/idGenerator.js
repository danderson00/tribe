(function () {
    T.Utils.idGenerator = function () {
        return {
            next: (function () {
                var id = 0;
                return function () {
                    if (arguments[0] == 0) {
                        id = 1;
                        return 0;
                    } else
                        return id++;
                };
            })()
        };
    };

    var generator = T.Utils.idGenerator();
    T.Utils.getUniqueId = function () {
        return generator.next();
    };
})();
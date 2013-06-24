(function() {
    // based on http://stackoverflow.com/questions/979256/how-to-sort-an-array-of-javascript-objects
    function sortBy(field, reverse, primer) {
        function key(x) { return primer ? primer(x[field]) : x[field]; };

        return function (a, b) {
            var A = key(a), B = key(b);
            return ((A < B) ? -1 :
                    (A > B) ? +1 : 0) * [-1, 1][+!!reverse];
        };
    }

    Array.prototype.sortBy = function (field, reverse, primer) {
        return this.sort(sortBy(field, reverse, primer));
    };
})();
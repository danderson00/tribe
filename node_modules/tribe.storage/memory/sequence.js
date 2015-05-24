module.exports = function () {
    var value = 0;

    return {
        next: function () {
            return ++value;
        }
    }
}

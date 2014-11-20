var keyPath = require('./keyPath');

module.exports = function (expression, values) {
    if (expression === undefined || expression === null
        || (expression.constructor === Array && expression.length === 0))
            return;

    if (expression.constructor === Array) {
        var result = [];
        for (var i = 0, l = expression.length; i < l; i++)
            result.push(applyExpressionValue(expression[i], values));
        return result;
    }

    return applyExpressionValue(expression, values);
};

function applyExpressionValue(expression, values) {
    var value = values;
    if (values && values.constructor === Object)
        value = values[expression.p]; //keyPath(expression.p, values);

    return { p: expression.p, o: expression.o, v: value };
}
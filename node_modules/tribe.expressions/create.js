module.exports = function (source, prepend) {
    var expression = [];
    for (var path in source)
        if (source.hasOwnProperty(path))
            expression.push({ p: (prepend ? prepend + '.' : '') + path, v: source[path] });
    return expression;
}
var _ = require('underscore');

//var predicate = {
//    p: 'path',      // path:        'path.to.property'
//    o: '=',         // operator:    '=', '!=', '>', '>=', '<', '<=', 'in'
//    v: 'value'      // value:       123, 'string', [1, 2, 3]
//};

module.exports = {
    toSql: function (predicates) {
        return {
            sql: sql(),
            parameters: parameters()
        }

        function sql() {
            if (!predicates) return '';

            if (predicates.constructor === Array) {
                if (predicates.length > 0)
                    return ' WHERE ' + _.map(predicates, toSql).join(' AND ') + orderBy();
                else
                    return '';
            } else
                  return ' WHERE ' + toSql(predicates) + orderBy();
        }

        function parameters() {
            if (predicates.constructor === Array)
                return _.flatten(_.pluck(predicates, 'v'));
            return _.flatten([predicates.v]);
        }

        function orderBy() {
            if (predicates.constructor === Array)
                return ' ORDER BY ' + _.map(predicates, columnName).join(',');
            return ' ORDER BY ' + columnName(predicates);
        }
    }
}

function toSql(predicate) {
    predicate.o = predicate.o || '=';
    return columnName(predicate) + ' ' + sqlOperator(predicate) + ' ' + parameterList(predicate.v);
}

function sqlOperator(predicate) {
    if (predicate.o === '=' && (predicate.v === undefined || predicate.v === null))
        return 'IS';
    if (predicate.o === '=' && predicate.v && predicate.v.constructor === Array)
        return 'IN';
    return predicate.o.toUpperCase();
}

function parameterList(value) {
    if (value && value.constructor === Array)
        return '(' + new Array(value.length + 1).join(',?').substring(1) + ')';
    return '?';
}

function columnName(predicate) {
    return predicate.p.replace(/\./g, '_');
}

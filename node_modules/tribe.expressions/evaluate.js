// Array.indexOf polyfill
require('./indexOf');

var keyPath = require('./keyPath');

module.exports = function (expression, target) {
  if(expression.constructor === Array) {
      for(var i = 0, l = expression.length; i < l; i++)
          if(!evaluate(expression[i], target)) {
            return false;
          }
      return true;
  } else
      return evaluate(expression, target);
}

function evaluate(expression, target) {
    var value = keyPath(expression.p, target);
    switch (expression.o) {
        case undefined:
        case '=': return value === expression.v;
        case '!=': return value !== expression.v;
        case '<': return value < expression.v;
        case '<=': return value <= expression.v;
        case '>': return value > expression.v;
        case '>=': return value >= expression.v;
        case 'in': return expression.v.indexOf(value) > -1;
        case 'contains': return value.indexOf(expression.v) > -1;
    }
}

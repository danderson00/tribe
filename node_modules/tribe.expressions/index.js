var keyPath = require('./keyPath'),
    evaluate = require('./evaluate'),
    apply = require('./apply'),
    create = require('./create'),
    combine = require('./combine');

module.exports = {
    evaluateKeyPath: keyPath,
    setKeyPath: keyPath.set,
    evaluate: evaluate,
    apply: apply,
    create: create,
    combine: combine
};

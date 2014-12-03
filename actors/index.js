var repository = require('./repository'),
    actorModule = require('tribe.pubsub/actor'),
    _ = require('underscore');

var api = module.exports = {
    register: repository.register,
    definition: repository.definition,
    indexes: function () {
        return _.unique(_.reduce(repository.actors, function (indexes, actor) {
            var expression = repository.definition(actor.path).expression;
            if (expression)
                if (expression.constructor === Array) {
                    if (expression.length > 0)
                        indexes.push.apply(indexes, _.pluck(expression, 'p'));
                }  else
                    indexes.push(expression.p);
            return indexes;
        }, []));
    },
    create: function (pubsub, path, scope, dependencies) {
        var constructor = repository.actor(path).constructor;
        return new actorModule(pubsub, constructor, scope, dependencies);
    }
};

require('./extensions')(api);
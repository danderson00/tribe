(function () {
    T.registerModel = function () {
        addResource('models', T.Utils.arguments(arguments));
    };

    T.registerSaga = function () {
        addResource('sagas', T.Utils.arguments(arguments));
    };
    
    function addResource(contextProperty, args) {
        var environment = T.scriptEnvironment || {};
        var context = environment.context || T.context();

        var path = args.string || environment.resourcePath;
        var constructor = args.func;
        var options = args.object;

        context[contextProperty].register(path, constructor, options);
    }

    T.run = function(options) {
        T.options = $.extend(T.options, options);
        T.options.pubsub = T.options.pubsub || new Tribe.PubSub({ sync: T.options.synchronous, handleExceptions: T.options.handleExceptions });
        ko.applyBindings();
        //if (preload) {
        //    var promises = [];
        //    var context = T.context();

        //    if ($.isArray(preload))
        //        for (var i = 0, l = preload.length; i < l; i++)
        //            addPromise(preload[i]);
        //    else if(preload.constructor === String)
        //        addPromise(preload);
            
        //    function addPromise(path) {
        //        promises.push(context.loader.get(T.Path(context.options.basePath).combine(path).toString(), null, context));
        //    }

        //    return $.when.apply(null, promises).done(function () {
        //        ko.applyBindings(model);
        //    });
        //} else
        //    ko.applyBindings(model);
    };
})(); 
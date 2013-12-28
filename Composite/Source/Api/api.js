(function () {
    TC.registerModel = function () {
        addResource('models', TC.Utils.arguments(arguments));
    };

    TC.registerSaga = function () {
        addResource('sagas', TC.Utils.arguments(arguments));
    };
    
    function addResource(contextProperty, args) {
        var environment = TC.scriptEnvironment || {};
        var context = environment.context || TC.context();

        var path = args.string || environment.resourcePath;
        var constructor = args.func;
        var options = args.object;

        context[contextProperty].register(path, constructor, options);
    }

    TC.run = function(options) {
        TC.options = $.extend(TC.options, options);
        TC.options.pubsub = TC.options.pubsub || new Tribe.PubSub({ sync: TC.options.synchronous, handleExceptions: TC.options.handleExceptions });
        ko.applyBindings();
        //if (preload) {
        //    var promises = [];
        //    var context = TC.context();

        //    if ($.isArray(preload))
        //        for (var i = 0, l = preload.length; i < l; i++)
        //            addPromise(preload[i]);
        //    else if(preload.constructor === String)
        //        addPromise(preload);
            
        //    function addPromise(path) {
        //        promises.push(context.loader.get(TC.Path(context.options.basePath).combine(path).toString(), null, context));
        //    }

        //    return $.when.apply(null, promises).done(function () {
        //        ko.applyBindings(model);
        //    });
        //} else
        //    ko.applyBindings(model);
    };
})(); 
(function () {
    TC.registerModel = function () {
        var environment = TC.scriptEnvironment || {};
        
        var context = environment.context || TC.context();
        var args = TC.Utils.arguments(arguments);
        
        var constructor = args.function;
        var options = args.object;
        var path = args.string || environment.resourcePath;
        
        context.models.register(path, constructor, options);
    };

    TC.run = function(preload, model) {
        if (preload) {
            var promises = [];
            var context = TC.context();

            if ($.isArray(preload))
                for (var i = 0; i < preload.length; i++)
                    addPromise(preload[i]);
            else
                addPromise(preload);
            
            function addPromise(path) {
                promises.push(context.loader.get(TC.Path(context.options.basePath).combine(path).toString(), null, context));
            }

            return $.when.apply(null, promises).done(function () {
                ko.applyBindings(model);
            });
        } else
            ko.applyBindings(model);
    };
})();
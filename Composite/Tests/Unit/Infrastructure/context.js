Test.Unit.context = function () {
    var template = '';
    var context = {
        loader: {
            get: sinon.spy()
        },
        models: {
            test: { constructor: sinon.spy() }
        },
        options: {
            synchronous: true,
            basePath: '',
            events: ['test']
        },
        templates: {
            template: '',
            store: sinon.spy(),
            loaded: sinon.spy(),
            render: function() {
                $('#qunit-fixture').append(template);
            }
        },
        setTemplate: function(value) {
            template = value;
        },
        loadedPanes: {},
        rootNode: null,
        renderOperation: {
            promise: $.Deferred(),
            complete: function () { }
        }
    };
    sinon.spy(context.templates, 'render');
    return context;
};
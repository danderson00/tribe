﻿suite('tribe.server.services', function () {
    test("registering a service adds the handler to the handlers collection", function () {
        var service = function () { },
            services = require('tribe/server/services');
        services.register('test', service);
        expect(services.handlers.test).to.equal(service);
    });

    test("invoking a service executes the registered handler", function () {
        var service = sinon.spy(),
            services = require('tribe/server/services');
        services.register('test', service);
        services.invoke('test', ['test']);
        expect(service.calledOnce).to.be.true;
        expect(service.firstCall.args[0]).to.equal('test');
    });

    test("http service invokes specified service", function () {
        var httpHandler;
        require.refresh('tribe/server/services');
        require.stub('tribe/server/http', {
            route: function (name) {
                return {
                    get: saveHandler,
                    post: saveHandler,
                    all: saveHandler
                };
                function saveHandler(handler) { httpHandler = handler; }
            },
            response: require('tribe/server/response')
        });

        var service = sinon.stub().returns('value'),
            send = sinon.spy(),
            services = require('tribe/server/services');
        services.register('test', service);

        return httpHandler({ param: function (name) { return name === 'name' ? 'test' : ['value']; } }, { send: send })
            .then(function () {
                expect(service.calledOnce).to.be.true;
                expect(service.firstCall.args[0]).to.equal('value');
                expect(send.calledOnce).to.be.true;
                expect(send.firstCall.args[0]).to.equal('value');
            });
    })
});
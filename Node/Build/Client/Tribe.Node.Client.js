
// Source/Client/setup.js

if (typeof (T) == 'undefined') T = {};
T.Types = T.Types || {};



// Source/Client/PubSub.extensions.js

(function () {
    Tribe.PubSub.prototype.startSaga = function (id, path, data) {
        if (path.charAt(0) !== '/')
            path = '/' + path;

        var saga = new Tribe.PubSub.Saga(this, sagaDefinition(path));
        saga.id = id;

        attachToHub(saga);

        T.hub.startSaga(path, id, data);

        return saga.start(data);
    };

    Tribe.PubSub.prototype.joinSaga = function (id, path, data) {
        var deferred = $.Deferred();
        var self = this;
        $.when($.get('/Data/' + id + '/' + id))
            .done(function (data) {
                var saga = new Tribe.PubSub.Saga(self, sagaDefinition(data.path));
                saga.id = id;
                saga.join(T.serializer.deserialize(data.data));
                attachToHub(saga);
                deferred.resolve(saga);
            })
            .fail(function (reason) {
                if (reason.status === 404 && path) {
                    var saga = self.startSaga(id, path, data);
                    deferred.resolve(saga);
                }
                else deferred.reject(reason);

            });
        return deferred;
    };

    function sagaDefinition(path) {
        return TC.context().sagas[path].constructor;
    }

    // need to also be able to detach
    function attachToHub(saga) {
        T.hub.join(saga.id);
        saga.pubsub.subscribe(saga.topics, function (message, envelope) {
            envelope.sagaId = saga.id;
            T.hub.publish(envelope);
        });
    }

    Tribe.PubSub.Lifetime.prototype.startSaga = Tribe.PubSub.prototype.startSaga;
    Tribe.PubSub.Lifetime.prototype.joinSaga = Tribe.PubSub.prototype.joinSaga;

    Tribe.PubSub.Channel.prototype.connect = function (topics) {
        var self = this;

        T.hub.join(this.id);
        this.subscribe(topics || '*', function(data, envelope) {
            T.hub.publish(envelope);
        });

        var end = this.end;
        this.end = function() {
            T.hub.leave(self.channelId);
            end();
        };

        return this;
    };
})();



// Source/Client/Types/Hub.js

T.Types.Hub = function (io, pubsub, options) {
    var socket = io.connect(options.socketUrl);

    socket.on('message', function (envelope) {
        envelope.origin = 'server';
        pubsub.publish(envelope);
    });

    this.publish = function(envelope) {
        if (!socket)
            throw 'Hub must be connected before calling publish';
        if(envelope.origin !== 'server')
            socket.emit('message', envelope);
    };

    this.join = function(channel) {
        socket.emit('join', channel);
    };

    this.startSaga = function(path, id, data) {
        socket.emit('startSaga', { path: path, id: id, data: data });
    };
};

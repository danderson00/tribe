(function () {
    Tribe.PubSub.prototype.startSaga = function (id, path, data) {
        if (path.charAt(0) !== '/')
            path = '/' + path;

        var saga = new Tribe.PubSub.Saga(this, sagaDefinition(path));

        if (id) {
            saga.id = id;
            attachToHub(saga);
            T.hub.startSaga(path, id, data);
        }

        return saga.start(data);
    };

    Tribe.PubSub.prototype.joinSaga = function (id, path, data) {
        var deferred = $.Deferred();
        var self = this;
        $.when($.get('Data/' + id + '/' + id))
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
        return T.context().sagas[path].constructor;
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
    Tribe.PubSub.Channel.prototype.startSaga = Tribe.PubSub.prototype.startSaga;
    Tribe.PubSub.Channel.prototype.joinSaga = Tribe.PubSub.prototype.joinSaga;

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

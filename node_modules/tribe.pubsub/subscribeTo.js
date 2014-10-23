module.exports = function (pubsub) {
    return function (topic) {
        return {
            when: function (property) {
                return {
                    equals: function (value) {
                        return {
                            execute: function (func) {
                                return pubsub.subscribe(topic, func, { p: property, v: value });
                            }
                        }
                    }
                }
            },
            execute: function (func) {
                return pubsub.subscribe(topic, func);
            }
        };
    };
}
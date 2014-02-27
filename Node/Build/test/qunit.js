module.exports = {
    run: function (pubsub) {
        var load = require('tribe/load'),
            options = require('tribe/options'),
            _ = require('underscore'),
            start,
            qunit = {};

        attachEvent = function (event, callback) {
            if (event === 'onload')
                start = callback;
        };


        loadQunit()
            .then(loadTests)
            .then(startTests);

        function loadQunit() {
            return load.file(options.libPath + 'qunit.js', 'Tests', 'qunit.js', { exports: qunit })
        }

        function loadTests() {
            return load.directory(options.basePath + 'Tests', 'Tests', '', { qunit: qunit }, 'qunit');
        }

        function startTests() {
            var assertions;

            qunit.testStart(function (test) {
                assertions = [];
                pubsub.publish('test.start', test);
            });

            qunit.log(function (assertion) {
                assertions.push(assertion);
            });

            qunit.testDone(function (test) {
                pubsub.publish('test.done', _.extend({ assertions: assertions }, test));
            });

            start();
        }
    }
};
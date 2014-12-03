﻿var Mocha = require('mocha'),
    load = require('tribe/test/load'),
    resources = require('tribe/utilities/files'),
    log = require('tribe.logger'),
    pubsub = require('tribe.pubsub'),
    options = require('tribe/options'),
    paths = require('tribe/utilities/paths'),
    testRequire = require('tribe/test/require'),
    convert = require('./convert'),
    chai = require('chai'),
    sinon = require('sinon'),
    _ = require('underscore'),
    files = {};

module.exports = {
    loadFile: function (mocha, path, debugPath) {
        if((!options.test.fileFilter || path.match(new RegExp(options.test.fileFilter))) &&
            (!options.childProcess || options.test.browser.runOnServer || !isBrowserTest(path))) {
            var context = {},
                originalTests = files[path] || {},
                originalAddTest;

            files[path] = {};

            // loads up the context object with the selected mocha interface
            mocha.suite.emit('pre-require', context, path, mocha);

            if(!options.childProcess)
                log.debug('Loading tests from ' + path);

            return load.file({
                path: path,
                debugPath: debugPath,
                debugDomain: 'Tests',
                args: _.extend({ expect: chai.expect, assert: chai.assert, sinon: sinon }, context),
                requireExtensions: { stub: testRequire.stub, refresh: testRequire.refresh, refreshAll: testRequire.refreshAll },
                beforeExecute: override,
                afterExecute: restore
            }).fail(broadcastError);

            function override() {
                originalAddTest = Mocha.Suite.prototype.addTest;
                Mocha.Suite.prototype.addTest = function (test) {
                    var existingTest = _.findWhere(this.tests, { title: test.title });
                    if(existingTest)
                        this.tests.splice(this.tests.indexOf(existingTest), 1);

                    originalAddTest.call(this, test)

                    // we can add the line number of the test from the stack trace
                    // use this for setting breakpoints for individual tests automatically
                    test.filename = path;
                    test.browser = isBrowserTest(path);
                    files[path][test.title] = test;

                    broadcastEvent('test.loaded', test);
                };
            }

            function restore() {
                Mocha.Suite.prototype.addTest = originalAddTest;

                _.each(originalTests, function (test) {
                    if (!files[path][test.title])
                        broadcastEvent('test.removed', test);
                });
            }

            function broadcastError(error) {
                log.error('Error loading test file ' + path, error);
                pubsub.publish({ topic: 'test.error', data: log.errorDetails(error), channelId: '__test' });
            }
        }
    },
    loadDirectory: function (mocha, path) {
        return resources.enumerateFiles(path, function (filePath, debugPath) {
            return module.exports.loadFile(mocha, filePath, debugPath);
        });
    },
    removeFile: function (mocha, path) {
        _.each(files[path], function (test) {
            broadcastEvent('test.removed', test);
        });
        delete files[path];
    }
}

function broadcastEvent(topic, test, error) {
    if(!options.childProcess)
        pubsub.publish({ topic: topic, data: convert.test(test, error), channelId: '__test' });
}

function isBrowserTest(path) {
    return _.any(options.browserTestPaths, function (browserPath) {
        return paths.locatedIn(browserPath, path);
    });
}
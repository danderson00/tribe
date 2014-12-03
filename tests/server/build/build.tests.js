﻿var Q = require('q');

suite('tribe.build', function () {
    var build, activities, spy1, spy2;

    // require.refresh only kicks in for the test, not setup. Something to fix...
    function refreshBuild() {
        require.refresh('tribe/build');
        require.refresh('tribe/build/activities');
        build = require('tribe/build');
        activities = require('tribe/build/activities');
        spy1 = sinon.spy();
        spy2 = sinon.spy();
    }

    test("build executes step factory for each step", function () {
        refreshBuild();
        activities.register('test', spy1);

        build.configure({ tasks: [{ activity: 'test' }, { activity: 'test' }] });
        expect(spy1.calledTwice).to.be.true;
    });

    test("build executes each phase on specified activities", function () {
        refreshBuild();
        activities.register('test', function () {
            return { phase1: spy1, phase2: spy2 };
        });

        return build
            .configure({ tasks: [{ activity: 'test' }, { activity: 'test' }], phases: ['phase1', 'phase2'] })
            .execute().then(function () {
                expect(spy1.calledTwice).to.be.true;
                expect(spy2.calledTwice).to.be.true;
            });
    });

    test("build passes options to activities", function () {
        refreshBuild();
        activities.register('test', function (options) {
            return {
                phase: function (context) { context.test = options; }
            };
        });

        var context = {};
        return build
            .configure({ tasks: [{ activity: 'test', options: 'test' }], phases: ['phase'] })
            .execute(context).then(function () {
                expect(context.test).to.equal('test');
            })
    });

    test("build passes context to tasks", function () {
        refreshBuild();
        activities.register('test', function () {
            return {
                phase: function (context) { context.test = 'test'; }
            };
        });

        var context = {};
        return build
            .configure({ tasks: [{ activity: 'test' }], phases: ['phase'] })
            .execute(context).then(function () {
                expect(context.test).to.equal('test');
            })
    });

    test("build executes phases in order", function () {
        refreshBuild();
        activities.register('test', function (options) {
            return {
                phase1: function (context) { context.test += options + '1 '; },
                phase2: function (context) { context.test += options + '2 '; }
            };
        });

        var context = { test: '' };
        return build
            .configure({ tasks: [{ activity: 'test', options: '1' }, { activity: 'test', options: '2' }], phases: ['phase1', 'phase2'] })
            .execute(context).then(function () {
                expect(context.test).to.equal('11 21 12 22 ');
            });
    });

    test("build waits for promises to be resolved", function () {
        refreshBuild();
        var deferred = Q.defer(),
            deferred2 = Q.defer();

        activities.register('test2', function (options) {
            return {
                phase1: function () {
                    return deferred.promise;
                },
                phase2: function () {
                },
                phase3: function () {
                    context.test = 3;
                }
            };
        });
        activities.register('test', function (options) {
            return {
                phase1: function () {
                    return deferred.promise;
                },
                phase2: function () {
                    return deferred2.promise;
                },
            };
        });

        var context = { };

        setTimeout(function () {
            expect(context.test).to.be.undefined;
            deferred.resolve();
        }, 200);

        setTimeout(function () {
            expect(context.test).to.be.undefined;
            deferred2.resolve();
        }, 200);

        return build
            .configure({ tasks: [{ activity: 'test' }, { activity: 'test2' }], phases: ['phase1', 'phase2', 'phase3'] })
            .execute(context).then(function () {
                expect(context.test).to.equal(3);
            });
    });
});
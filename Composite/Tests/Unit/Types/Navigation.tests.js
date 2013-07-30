(function () {
    var nav;
    var node;

    module('Unit.Types.Navigation', {
        setup: function () {
            node = nodeStub('test');
            nav = new TC.Types.Navigation(node, { transition: 'fade' });
            TC.history = { navigate: sinon.spy(), update: sinon.spy() };
        },
        teardown: function() {
            nav.dispose();
        }
    });

    test("forward transitions to specified pane", function () {
        var navigateArgs = { path: 'test2' };
        nav.navigate(navigateArgs);
        equal(node.transitionTo.firstCall.args[0], navigateArgs);
        equal(node.transitionTo.firstCall.args[1], 'fade');
    });

    test("forward accepts string transition as options", function () {
        nav = new TC.Types.Navigation(node, 'fade');
        var navigateArgs = { path: 'test2' };
        nav.navigate(navigateArgs);
        equal(node.transitionTo.firstCall.args[0], navigateArgs);
        equal(node.transitionTo.firstCall.args[1], 'fade');
    });

    test("back returns to initial pane with reverse transition", function() {
        nav.navigate({ path: 'test2' });
        nav.go(-1);
        equal(node.transitionTo.secondCall.args[0].path, 'test');
        equal(node.transitionTo.secondCall.args[2], true);
    });

    test("back returns to previous pane", function () {
        nav.navigate({ path: 'test2' });
        nav.navigate({ path: 'test3' });
        nav.go(-1);
        equal(node.transitionTo.lastCall.args[0].path, 'test2');
    });

    test("back does nothing if no stack", function () {
        nav.go(-1);
        ok(node.transitionTo.notCalled);
    });

    test("forward does nothing if no stack", function () {
        nav.go(1);
        ok(node.transitionTo.notCalled);
    });

    test("back two returns to initial pane", function() {
        nav.navigate({ path: 'test2' });
        nav.navigate({ path: 'test3' });
        nav.go(-2);
        equal(node.transitionTo.lastCall.args[0].path, 'test');
    });

    test("forward moves stack forward if stack exists", function () {
        nav.navigate({ path: 'test2' });
        nav.navigate({ path: 'test3' });
        nav.go(-2);
        nav.go(1);
        equal(node.transitionTo.lastCall.args[0].path, 'test2');
    });

    test("document navigating event is raised when navigating", function () {
        expect(1);
        document.addEventListener('navigating', assert);
        nav.navigate({ path: 'test2' });
        document.removeEventListener('navigating', assert);
        
        function assert(e) {
            equal(e.data.options.path, 'test2');
        }
    });

    test("TC.history.navigate is called on navigate when browser option is set", function() {
        nav = new TC.Types.Navigation(node, { browser: true });
        nav.navigate({ path: 'test2' });
        ok(TC.history.navigate.calledOnce);
    });

    test("TC.history.update is called on go when browser option is set", function () {
        nav = new TC.Types.Navigation(node, { browser: true });
        nav.navigate({ path: 'test2' });
        nav.go(-1);
        ok(TC.history.update.calledOnce);
    });

    test("node transitions when browser.go event is received", function() {
        nav = new TC.Types.Navigation(node, { browser: true });
        nav.navigate({ path: 'test2' });
        TC.Utils.raiseDocumentEvent('browser.go', { count: -1 });
        equal(node.transitionTo.secondCall.args[0].path, 'test');
    });

    test("initial state is set from urlProvider if paneOptionsFrom returns paneOptions object", function () {
        var provider = {
            paneOptionsFrom: function() {
                return {
                    path: 'test',
                    data: { test: 'test' }
                };
            }
        };
        nav = new TC.Types.Navigation(node, { browser: provider });
        deepEqual(nav.stack[0], provider.paneOptionsFrom());
    });

    test("initial state is not set from urlProvider if paneOptionsFrom returns null", function() {
        var provider = {
            paneOptionsFrom: function () { return null; }
        };
        nav = new TC.Types.Navigation(node, { browser: provider });
        deepEqual(nav.stack[0].path, 'test');
    });

    test("history url and title are set from urlProvider when navigating", function () {
        var provider = {
            paneOptionsFrom: function () { return null; },
            urlDataFrom: function() {
                return {
                    url: 'test',
                    title: 'test'
                };
            }
        };
        nav = new TC.Types.Navigation(node, { browser: provider });
        nav.navigate({ path: 'test2' });
        deepEqual(TC.history.navigate.firstCall.args[0], provider.urlDataFrom());
    });

    Test.urlProvider = {
        urlDataFrom: function() {
            return {
                url: 'test',
                title: 'test'
            };
        },
        paneOptionsFrom: function() {
            return {
                path: 'test',
                data: { test: 'test' }
            };
        }
    };

    function nodeStub(path) {
        return {
            id: 1,
            pane: { path: path },
            transitionTo: sinon.spy()
        };
    }
})();

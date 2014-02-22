(function () {
    var history;
    var api;

    module('Unit.Types.History', {
        setup: function () {
            api = mockHistoryApi();
            history = new T.Types.History(api);
        },
        teardown: function () {
            history.dispose();
        }
    });

    test("browser.go is raised when popstate event is raised normally", function () {
        if (Test.supportsHistory) {
            expect(1);

            function assert(e) {
                equal(e.eventData.count, 1);
            }

            T.Utils.handleDocumentEvent('browser.go', assert);
            raisePopstate();
            T.Utils.detachDocumentEvent('browser.go', assert);
        } else ok(true, "Test skipped - History API is not supported.");
    });

    test("browser.go is not raised when update is called and popstate is raised", function () {
        if (Test.supportsHistory) {
            expect(0);

            function assert(e) {
                equal(e.eventData.count, 1);
            }

            T.Utils.handleDocumentEvent('browser.go', assert);
            history.update(1);
            raisePopstate();
            T.Utils.detachDocumentEvent('browser.go', assert);
        } else ok(true, "Test skipped - History API is not supported.");
    });

    test("window.history.go is called when go is called", function () {
        history.go(1);
        ok(api.go.calledOnce);
    });

    test("window.history.pushState is called when navigate is called", function() {
        history.navigate();
        ok(api.pushState.calledOnce);
    });

    test("window.history.pushState is called with url and title if urlProvider is passed", function() {
        history.navigate({ url: 'url1', title: 'title1' });
        equal(api.pushState.firstCall.args[1], 'title1');
        equal(api.pushState.firstCall.args[2], 'url1');
    });

    function mockHistoryApi() {
        return {
            pushState: sinon.spy(),
            go: sinon.spy(),
            replaceState: sinon.spy()
        };
    }

    function raisePopstate() {
        var e = new Event("popstate");
        e.state = 1;
        window.dispatchEvent(e);
    }
})();

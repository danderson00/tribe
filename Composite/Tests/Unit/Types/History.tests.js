(function () {
    var history;
    var api;

    module('Unit.Types.History', {
        setup: function () {
            api = mockHistoryApi();
            history = new TC.Types.History(api);
        },
        teardown: function () {
            history.dispose();
        }
    });

    test("browser.go is raised when popstate event is raised normally", function () {
        expect(1);

        TC.Utils.handleDocumentEvent('browser.go', assert);
        raisePopstate();
        TC.Utils.detachDocumentEvent('browser.go', assert);

        function assert(e) {
            equal(e.data.count, 1);
        }
    });

    test("browser.go is not raised when update is called and popstate is raised", function () {
        expect(0);
        
        TC.Utils.handleDocumentEvent('browser.go', assert);
        history.update(1);
        raisePopstate();
        TC.Utils.detachDocumentEvent('browser.go', assert);

        function assert(e) {
            equal(e.data.count, 1);
        }
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
        TC.Utils.raiseDocumentEvent('popstate', null, 1);
    }
})();

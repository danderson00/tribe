//(function () {
//    var history;

//    module('Integration.History', {
//        setup: function () {
//            history = new T.Types.History(window.history);
//            Test.Integration.createTestElement();
//        },
//        teardown: function() {
//            history.dispose();
//        }
//    });

//    test("History sets window state when navigating", function () {
//        T.createNode('.test', { path: 'History/layout' });
//        T.nodeFor('.content1').navigate('content2');
//        var options = JSON.parse(window.history.state.options);
//        equal(options.path, '/History/content2');
//    });

//    // these tests sometimes seem to do strange things to the Chrome debugger. If breakpoints aren't being hit, this is the culprit.
//    asyncTest("History transitions navigation node to previous state when back is called", function () {
//        expect(2);
//        T.createNode('.test', { path: '/History/layout' });
//        T.nodeFor('.content1').navigate('content2');
//        window.history.back();
//        setTimeout(function() {
//            equal($('.content2').length, 0);
//            equal($('.content1').length, 1);
//            start();
//        }, 50);
//    });

//    asyncTest("History transitions navigation node to next state when forward is called", function () {
//        expect(2);
//        T.createNode('.test', { path: '/History/layout' });
//        T.nodeFor('.content1').navigate('content2');
//        window.history.back();
//        setTimeout(function () {
//            window.history.forward();
//            setTimeout(function () {
//                equal($('.content2').length, 1);
//                equal($('.content1').length, 0);
//                start();
//            }, 50);
//        }, 50);
//    });

//    test("document navigating event is raised once", function () {
//        expect(2);
//        $(document).on('navigating', function(e, data) {
//            equal(data.options.path, '/Navigate/content2');
//            equal(data.options.data, 'test');
//        });
//        T.createNode('.test', { path: 'Navigate/layout' });
//        T.nodeFor('.content1').navigate({ path: 'content2', data: 'test' });
//        $(document).off('navigating');
//    });
//})();

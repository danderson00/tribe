(function () {
    module('Integration.Transition', {
        setup: Test.Integration.createTestElement,
        teardown: Test.Integration.teardown
    });

    test("transitioning node replaces pane with specified pane", function () {
        T.createNode('.test', { path: 'Transition/pane1' });
        equal($('.pane1').length, 1);
        T.transition(T.nodeFor('.pane1')).to('Transition/pane2');
        equal($('.pane1').length, 0);
        equal($('.pane2').length, 1);
    });

    test("transitioning element replaces pane with specified pane", function () {
        T.createNode('.test', { path: 'Transition/pane1' });
        equal($('.pane1').length, 1);
        T.transition('.test').to('Transition/pane2');
        equal($('.pane1').length, 0);
        equal($('.pane2').length, 1);
    });

    test("specifying reverseTransitionIn pane option applies reverse transition", function () {
        if (Test.supportsTransitions) {
            T.createNode('.test', { path: 'Transition/pane1', transition: 'slideLeft', reverseTransitionIn: true });
            ok($('.pane1').parent().hasClass('slideRight'));
        } else ok(true, "Test skipped - browser does not support CSS transitions.");
    });

    test("specifying reverse argument applies reverse transition", function () {
        if (Test.supportsTransitions) {
            T.createNode('.test', { path: 'Transition/pane1', transition: 'slideLeft', reverseTransitionIn: true });
            T.transition(T.nodeFor('.pane1'), null, true).to('Transition/pane2');
            ok($('.pane1').parent().hasClass('slideRight'));
            ok($('.pane2').parent().hasClass('slideRight'));
        } else ok(true, "Test skipped - browser does not support CSS transitions.");
    });

    asyncTest("async transition to replaces pane with specified pane", function () {
        T.options.synchronous = false;
        var context = T.context();
        T.createNode('.test', { path: 'Transition/pane1' }, null, context);
        $.when(context.renderOperation.promise).done(function() {
            equal($('.pane1').length, 1);
            $.when(T.transition('.test').to('Transition/pane2')).done(function() {
                equal($('.pane1').length, 0);
                equal($('.pane2').length, 1);
                start();
            });
        });
    });
})();

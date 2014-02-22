(function () {
    //createWebkitTransition('pop');
    //createWebkitTransition('flipLeft', 'flipRight');
    //createWebkitTransition('flipRight', 'flipLeft');
    //createWebkitTransition('swapLeft', 'swapRight');
    //createWebkitTransition('swapRight', 'swapLeft');
    //createWebkitTransition('cubeLeft', 'cubeRight');
    //createWebkitTransition('cubeRight', 'cubeLeft');

    function createWebkitTransition(name, reverse) {
        T.Transitions[name] = {
            in: function(element) {
                var $element = $(element);
                $element.bind('webkitAnimationEnd', animationEnd)
                        .addClass(name + ' in');

                var promise = $.Deferred();
                return promise;

                function animationEnd() {
                    $element.unbind('webkitAnimationEnd', animationEnd)
                            .removeClass(name + ' in');
                    promise.resolve();
                }
            },
            
            out: function(element) {
                var $element = $(element);
                $element.bind('webkitAnimationEnd', animationEnd)
                        .addClass(name + ' out');

                var promise = $.Deferred();
                return promise;

                function animationEnd() {
                    $element.unbind('webkitAnimationEnd', animationEnd)
                            .removeClass(name + ' out');
                    promise.resolve();
                }
            },
            reverse: reverse || name
        };
    }
})();

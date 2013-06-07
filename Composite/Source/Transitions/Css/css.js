(function () {
    createCssTransition('fade');
    createCssTransition('pop');
    createCssTransition('slideLeft', 'slideRight');
    createCssTransition('slideRight', 'slideLeft');
    createCssTransition('slideUp', 'slideDown');
    createCssTransition('slideDown', 'slideUp');
    createCssTransition('flipLeft', 'flipRight');
    createCssTransition('flipRight', 'flipLeft');
    createCssTransition('swapLeft', 'swapRight');
    createCssTransition('swapRight', 'swapLeft');
    createCssTransition('cubeLeft', 'cubeRight');
    createCssTransition('cubeRight', 'cubeLeft');

    function createCssTransition(name, reverse) {
        TC.Transitions[name] = {
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
                            .removeClass(name + ' out')
                            .remove();
                    promise.resolve();
                }
            },
            reverse: reverse || name
        };
    }
})();

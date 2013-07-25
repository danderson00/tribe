(function () {
    createCssTransition('fade');
    createCssTransition('slideLeft', 'slideRight');
    createCssTransition('slideRight', 'slideLeft');
    createCssTransition('slideUp', 'slideDown');
    createCssTransition('slideDown', 'slideUp');

    var transitionEndEvents = 'webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd';

    function createCssTransition(transition, reverse) {
        TC.Transitions[transition] = {
            in: function (element) {
                var promise = $.Deferred();
                $(element).bind(transitionEndEvents, transitionEnded(element, promise))
                    .addClass('prepare in ' + transition);
                    //.show();

                trigger(element);
                return promise;
            },

            out: function (element) {
                var promise = $.Deferred();

                $(element).addClass('prepare out ' + transition)
                    .on(transitionEndEvents, transitionEnded(element, promise, true));

                trigger(element);
                return promise;
            },
            reverse: reverse || transition
        };

        function trigger(element) {
            setTimeout(function () {
                $(element).addClass('trigger');
            }, 30);
        }

        function transitionEnded(element, promise, hide) {
            return function() {
                $(element).unbind(transitionEndEvents)
                    .removeClass(transition + ' in out prepare trigger');
                if (hide) $(element).hide();
                promise.resolve();
            };
        }
    }

    //function createCssTransition(name, reverse) {
    //    TC.Transitions[name] = {
    //        in: function(element) {
    //            var $element = $(element);
    //            $element.bind('webkitTransitionEnd', animationEnd)
    //                    .addClass(name + ' in');

    //            var promise = $.Deferred();
    //            return promise;

    //            function animationEnd() {
    //                $element.unbind('webkitTransitionEnd', animationEnd)
    //                        .removeClass(name + ' in');
    //                promise.resolve();
    //            }
    //        },

    //        out: function(element) {
    //            var $element = $(element);
    //            $element.bind('webkitTransitionEnd', animationEnd)
    //                    .addClass(name + ' out');

    //            var promise = $.Deferred();
    //            return promise;

    //            function animationEnd() {
    //                $element.unbind('webkitTransitionEnd', animationEnd)
    //                        .removeClass(name + ' out');
    //                promise.resolve();
    //            }
    //        },
    //        reverse: reverse || name
    //    };
    //}
})();

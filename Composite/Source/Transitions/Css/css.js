(function () {
    var supported = supportsTransitions();
    
    createCssTransition('fade');
    createCssTransition('slideLeft', 'slideRight');
    createCssTransition('slideRight', 'slideLeft');
    createCssTransition('slideUp', 'slideDown');
    createCssTransition('slideDown', 'slideUp');

    var transitionEndEvents = 'webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd';

    function createCssTransition(transition, reverse) {
        TC.Transitions[transition] = {
            in: function (element) {
                if (!supported) return null;
                
                var promise = $.Deferred();
                $(element).bind(transitionEndEvents, transitionEnded(element, promise))
                    .addClass('prepare in ' + transition);

                trigger(element);
                return promise;
            },

            out: function (element) {
                if (!supported) return null;
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
    
    function supportsTransitions() {
        var b = document.body || document.documentElement;
        var style = b.style;
        var property = 'transition';
        var vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

        if (typeof style[property] == 'string') { return true; }

        // Tests for vendor specific prop
        property = property.charAt(0).toUpperCase() + property.substr(1);
        for (var i = 0, l = vendors.length; i < l; i++) {
            if (typeof style[vendors[i] + property] == 'string') { return true; }
        }
        
        return false;
    }
})();

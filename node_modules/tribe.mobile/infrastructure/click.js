(function () {
    var supportsTouch;
    $(function() { supportsTouch = 'ontouchstart' in document; });
    
    ko.bindingHandlers['click'] = {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            applyFastClick(element);
            applyActiveClass(element);

            var newValueAccessor = function () { return { click: valueAccessor() }; };
            return ko.bindingHandlers['event']['init'].call(this, element, newValueAccessor, allBindingsAccessor, viewModel);
        }
    };

    function applyActiveClass(element) {
        var $element = $(element);
        $element.bind(supportsTouch ? 'touchstart' : 'mousedown', touchStartHandler);

        function touchStartHandler(e) {
            $element.addClass('active');

            // Remove our active class if we move
            $element.on(supportsTouch ? 'touchmove' : 'mousemove', function () {
                $element.removeClass('active');
            });

            $element.on(supportsTouch ? 'touchend' : 'mouseup', function () {
                $element.removeClass('active').unbind('touchmove mousemove');
            });
        }
    }

    function applyFastClick(element) {
        var $element = $(element);

        if (supportsTouch)
            $element.on('touchstart', touchstart);

        var moved;

        function touchstart(e) {
            e.preventDefault();
            moved = false;
            $element.on('touchmove', touchmove);
            $element.on('touchend', touchend);
        }

        function touchmove(e) {
            moved = true;
        }

        function touchend(e) {
            $element.off('touchmove', touchmove);
            $element.off('touchend', touchend);

            if (!moved)
                $element.click();
        }
    }
})();

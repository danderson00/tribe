(function(utils) {
    utils.checkHorizontalPosition = function(element, margin) {
        var offset = element.offset();
        if (!margin) margin = 5;

        if (offset.left < margin)
            element.css({ 'margin-left': margin - offset.left });

        var right = offset.left + element.outerWidth();

        if (right > screen.width - margin)
            element.css({ 'margin-left': screen.width - right - margin });
    };

    utils.checkVerticalPosition = function(target) {
        var $target = $(target);
        var maxHeight = $(window).height();
        var targetHeight = $target.outerHeight();

        if ($target.offset().top + targetHeight > maxHeight) {
            var newTop = maxHeight - targetHeight;
            var $parent = $target.offsetParent();
            var adjustment = $parent.offset().top - $parent.position().top;
            target.css('top', newTop - adjustment);
        }
    };

    function findParentElement(element, filter) {
        if (filter(element))
            return element;

        var parents = $(element).parents().filter(function() {
            return filter(this);
        });

        if (parents.length > 0)
            return parents[0];

        return null;
    };

    utils.viewportElementFor = function(element) {
        var viewport = findParentElement(element, function(target) {
            return $(target).css('overflow') === 'hidden' || $(target).css('overflow') === 'auto';
        });

        return viewport ? viewport : $('body');
    };

    utils.containingElementFor = function(element) {
        var viewport = findParentElement(element, function(target) {
            return $(target).css('position') === 'relative';
        });

        return viewport ? viewport : $('body');
    };

    utils.elementIsRightAligned = function(element) {
        return findParentElement(element, function(target) {
            if ($(target).css('right') !== 'auto' && $(target).css('left') === 'auto') {
                TC.logger.debug("Element is aligned right by position (" + $(target).css('right') + "): " + $(element).attr('class'));
                return target;
            }
            if ($(target).css('float') === 'right') {
                TC.logger.debug("Element is aligned right by float: " + $(element).attr('class'));
                return target;
            }
            return false;
        }) !== null;
    };

    utils.elementIsFixed = function(element) {
        return findParentElement(element, function(target) {
            if ($(target).css('position') === 'fixed')
                return target;
        });
    };
})(TC.Utils);

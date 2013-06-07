(function () {
    TC.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;
        var self = this;

        var $arrow;
        var $content;
        var $container;
        var $element = $(pane.element);
        var position = data.position ? data.position : 'right';
        var maxWidth = data.maxWidth ? data.maxWidth : 300;

        var $target = data.target ? $(data.target) : $element.prev();
        if ($target.length == 0)
            $target = $('body');

        this.html = data.html;

        pubsub.subscribe('tooltip.show', function (message) {
            if (!message || message.pane === pane || (message.topic && message.topic === data.topic))
                show(message && message.immediate);
        });

        pubsub.subscribe('tooltip.hide', function (message) {
            if (!message || message.pane === pane || (message.topic && message.topic === data.topic))
                hide(message && message.immediate);
        });

        if (data.autoShow)
            setTimeout(show);

        if (data.hover)
            $target.hover(show, hide);

        function show(immediate) {
            if ($target.is(":visible") && ko.utils.unwrapObservable(self.html)) {
                $container = $element.children('.tooltip');
                $content = $container.children('.tooltipContent');
                $arrow = $container.children('.tooltipArrow');

                $container.show();
                setWidth();
                setPropertiesFor[position]();
                setCss();
                $container.hide();

                immediate ? $container.show() : $container.fadeIn('fast');
                if (data.timeout)
                    setTimeout(hide, data.timeout);
            }
        };

        function hide(immediate) {
            if($container)
                immediate ? $container.hide() : $container.fadeOut('fast');
        }

        function setWidth() {
            if (data.width)
                $content.width(data.width);
            else if ($content.width() > maxWidth)
                $content.width(maxWidth);
        }

        function setCss() {
            if (data.css) {
                if (data.css.arrow) $arrow.css(data.css.arrow);
                if (data.css.content) $content.css(data.css.content);
            }
        }

        var setPropertiesFor = {
            left: function () {
                if (elementIsFixed($target)) {
                    $(pane.element).children('.tooltip').css('position', 'fixed');
                    $arrow.addClass('arrowRight').offset({
                        left: $target.offset().left - $arrow.outerWidth(),
                        top: $target.offset().top + $target.outerHeight(true) / 2 - $arrow.outerHeight() / 2
                    });
                    $content.offset({
                        left: $target.offset().left - $content.outerWidth() - $arrow.outerWidth(),
                        top: $target.offset().top + $target.outerHeight(true) / 2 - $content.outerHeight(true) / 2
                    });
                } else {
                    $arrow.addClass('arrowRight').css({
                        left: $target.position().left - $arrow.outerWidth(),
                        top: $target.position().top + $target.outerHeight(true) / 2 - $arrow.outerHeight() / 2
                    });
                    $content.css({
                        left: $target.position().left - $content.outerWidth() - $arrow.outerWidth(),
                        top: horizontalTop()
                    });
                }
            },
            right: function () {
                $arrow.addClass('arrowLeft').css({
                    left: $target.position().left + $target.width(),
                    top: $target.position().top + $target.outerHeight(true) / 2 - $arrow.outerHeight() / 2
                });
                $content.css({
                    left: $target.position().left + $target.width() + $arrow.outerWidth(),
                    top: horizontalTop()
                });
            },
            above: function () {
                $arrow.addClass('arrowDown').css({
                    top: $target.position().top - $arrow.outerHeight()
                });
                $content.css({
                    top: $target.position().top - $content.outerHeight() - $arrow.outerHeight()
                });
                setHorizontalPosition();
            },
            below: function () {
                $arrow.addClass('arrowUp').css({
                    top: $target.position().top + $target.outerHeight(true)
                });
                $content.css({
                    top: $target.position().top + $target.outerHeight(true) + $arrow.outerHeight()
                });
                setHorizontalPosition();
            },
            auto: function () {
                if ($target.offset().left + $target.outerWidth() + $content.width() > $(window).width())
                    setPropertiesFor.left();
                else
                    setPropertiesFor.right();
            }
        };

        function horizontalTop() {
            return $target.position().top + $target.outerHeight(true) / 2 - $content.outerHeight(true) / 2;
        }

        function setHorizontalPosition() {
            if (elementIsRightAligned($target)) {
                $content.css('right', 0);
                $arrow.css('right', elementRight($target) + $target.width() / 2 - $arrow.outerWidth() / 2);
            } else {
                $content.css('left', $target.position().left + $target.outerWidth(true) / 2 - $content.outerWidth(true) / 2 + offsetLeft());
                $arrow.css('left', $target.position().left + $target.width() / 2 - $arrow.outerWidth() / 2);
            }
        }

        function offsetLeft() {
            var left = $target.position().left + $target.outerWidth(true) / 2 - $content.outerWidth(true) / 2;

            if (left < 20)
                return 20 - left;

            var right = left + $content.outerWidth();
            var $viewport = $(viewportElementFor($target));
            if (right > $viewport.width() - 5)
                return $viewport.width() - right - 5;

            return 0;
        }

        function elementRight(element) {
            return $(containingElementFor(element)).width() - $(element).position().left - $(element).width();
        }

    });
})();

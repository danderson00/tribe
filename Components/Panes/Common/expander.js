(function () {
    TC.registerModel(function (pane) {
        pane.node.skipPath = true;
        
        var pubsub = pane.pubsub;
        var data = pane.data;

        var self = this;

        this.headerText = data.headerText;
        this.loading = ko.observable(false);
        this.expanded = ko.observable(false);
        if (data.rememberState !== false)
            this.expanded.extend({ persist: key('expanded') });

        var $content;
        var $header;
        var $arrow;
        var childPane;

        this.renderComplete = function () {
            var $element = $(pane.element);
            $content = $element.find('.expanderContent');
            $header = $element.find('.expanderHeader');
            $arrow = $element.find('.arrow');

            if (data.autoOpen === true || self.expanded())
                renderPane(false);

            setIcon();

            //TC.renderTooltips(self.tooltips, 'help', pane);
        };

        this.click = function () {
            if (isRendered())
                togglePane();
            else
                renderPane();
        };

        this.print = function ($data, event) {
            printElement($content);
            event.stopPropagation();
        };

        // these two functions should really be expressed in the markup using a binding, not the model
        this.loading.subscribe(function (value) {
            $arrow.removeClass();
            $arrow.addClass('icon iconLoading');
        });

        this.expanded.subscribe(function (value) {
            $arrow.removeClass();
            if (value)
                $arrow.addClass('arrow smallArrowUp');
            else
                $arrow.addClass('arrow smallArrowDown');
        });

        pubsub.subscribe('expander.toggle', function (id) {
            if (id === undefined || id === pane.id)
                togglePane();
        });

        function setIcon() {
            if (data.iconClass)
                $(pane.element).find('.icon').addClass(data.iconClass);
        }

        function togglePane(scroll) {
            if ($content.is(":visible")) {
                $content.slideUp('fast', function () {
                    $header.addClass('roundedBottom');
                });
                self.expanded(false);
            } else {
                $header.removeClass('roundedBottom');
                $content.slideDown('fast', function () {
                    if (scroll !== false) scrollToContent();
                });
                self.expanded() ? self.expanded.notifySubscribers(true) : self.expanded(true);
            }
        };

        function scrollToContent() {
            var viewportHeight = $(viewportElementFor(pane.element)).height();
            var paneHeight = $(pane.element).outerHeight(true);
            var screenOverlap = $(pane.element).offset().top + paneHeight - $(window).height() + 20;
            if (screenOverlap > 0) {
                if (paneHeight > viewportHeight - 10)
                    screenOverlap -= paneHeight - viewportHeight + 10;
                $('.scrollable').animate({ scrollTop: $('.scrollable').scrollTop() + screenOverlap }, 'fast');
            }
        }

        function renderPane(scroll) {
            self.loading(true);
            childPane = TC.appendNode($content, { path: data.pane, data: data.data }).pane;

            $.when(childPane.is.rendered).always(function() {
                self.loading(false);
                togglePane(scroll);
            });
        }

        function isRendered() {
            return $content.children().length > 0;
        }

        function key(name) {
            return (pane && pane.node.parent ? pane.node.parent.pane.path + ',' : '') + data.pane + ',' + name;
        }

        //        this.tooltips = {
        //            printExpander: {
        //                selector: '.expander .iconPrint',
        //                position: 'below',
        //                html: 'Print this section by clicking this icon'
        //            }
        //        };
    });
})();
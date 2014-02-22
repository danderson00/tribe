T.scriptEnvironment = { resourcePath: '/Common/dialog' };
(function () {
    T.registerModel(function (pane) {
        pane.node.skipPath = true;
        
        var self = this;
        var pubsub = pane.pubsub;
        var data = pane.data;
        var options = data.options ? data.options : {};

        this.pane = data.pane;
        this.id = options.id ? options.id : T.getUniqueId();
        this.showCloseButton = options.showCloseButton !== false;

        var dialogSelector = '#' + this.id;

        if (options.showLoadingDialog)
            centerDialog('.loadingDialog');

        if (options.closeOnNavigate)
            pubsub.subscribeOnce('navigating', closeDialog);

        this.paneRendered = function() {
            if (options.title)
                T.createNode(pane.find('.dialogHeader'), { path: '/Common/contentHeader', data: { text: options.title } });
        };

        this.renderComplete = function () {
            positionDialog(dialogSelector, dialogSelector + ' .dialogContent');
            hideDialog('.loadingDialog');
            showDialog(dialogSelector + ':not(.loadingDialog)');

            if (options.modal !== false) {
                showDialog('.dialogBackgroundFilter');
                $(pane.element).bind('destroyed', function () { hideDialog('.dialogBackgroundFilter'); });
            }

            if(!options.reusable)
                $.when(T.Utils.elementDestroyed($(dialogSelector + ' .dialogPane'))).done(function() {
                    pane.remove();
                });
        };

        this.dispose = function() {
            pubsub.publish('dialogClosed', { id: self.id });
        };

        function positionDialog(selector, contentSelector) {
            if (options.css)
                pane.find(selector).removeAttr('style').css(options.css);

            if (!hasVerticalPositionAttributes(options.css))
                centerVertically(selector, contentSelector);

            if (!hasHorizontalPositionAttributes(options.css))
                centerHorizontally(selector, contentSelector);
        }

        function hasHorizontalPositionAttributes(source) {
            return source && (source.left || source.right);
        }

        function hasVerticalPositionAttributes(source) {
            return source && (source.top || source.bottom);
        }

        function centerDialog(selector, contentSelector) {
            centerHorizontally(selector, contentSelector);
            centerVertically(selector, contentSelector);
        }

        function centerHorizontally(selector, contentSelector) {
            //var left = ($(window).width() - pane.find(selector).outerWidth()) / 2;

            //pane.find(selector).css({ left: left < 0 ? 0 : left });
            pane.find(selector).css({ left: 100 });

            if (contentSelector)
                pane.find(contentSelector).css({ maxWidth: $(this).parent().width() });
        }

        function centerVertically(selector, contentSelector) {
            //var top = ($(window).height() - pane.find(selector).outerHeight()) / 2;

            //pane.find(selector).css({ top: top < 65 ? 65 : top });
            pane.find(selector).css({ top: 100 });

            if (contentSelector)
                pane.find(contentSelector).css({ maxHeight: $(this).parent().height() - 65 });

        }

        function hideDialog(selector) {
            pane.find(selector).hide();
        }

        function showDialog(selector) {
            pane.find(selector).fadeIn(200);
        }

        function closeDialog() {
            pane.remove();
        }
        this.closeDialog = closeDialog;
    });
})();

T.dialog = function (pane, options) {
    options = options || {};
    var element = options.element ? $(options.element) : 'body';
    pane = typeof (pane) == 'string' ? { path: pane } : pane;
    options.id = options.id ? options.id : T.getUniqueId();
    var title = ko.observable(options.title);
    options.title = options.title && title;

    var node = T.appendNode(element, { path: '/Common/dialog', id: options.id, data: { pane: pane, options: options } }, options.node);
    return {
        node: node,
        close: node.pane.remove,
        transitionTo: function (paneOptions, newTitle) {
            title(newTitle);
            node.children[0].transitionTo(paneOptions);
        }
    };
};
T.overlay = T.dialog;

T.Types.Pane.prototype.dialog = function (pane, options) {
    return T.dialog(pane, $.extend({ node: this.node }, options));
};
//@ sourceURL=tribe:///Common/Panes/dialog
T.scriptEnvironment = { resourcePath: '/Common/tabPanel' };
// needs a big ol' refactor
(function () {
    T.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;

        var self = this;
        this.loggedOn = CurrentUser.isAuthenticated;
        this.tabs = data.tabs;
        this.pane = pane;

        var currentTab;
        var panes = {};
        var tabPanel;

        var dock = data.dock;
        if (!dock) dock = 'top';
        var tabPanelClass = dock + 'TabPanel';
        var implementation = dockImplementation();
        this.tooltipPosition = implementation.tooltipPosition;

        this.paneRendered = function () {
            // using the attr binding to set a class does not seem reliable, do it here instead    
            tabPanel = $(pane.element).children('.tabPanel');
            tabPanel.addClass(tabPanelClass);
            implementation.initialise();
            tabPanel.show();

            var autoOpenTab = _.find(self.tabs, function (tab) { return tab.autoOpen === true; });
            if (autoOpenTab)
                toggle(autoOpenTab);
        };

        this.click = function (item) {
            var clickData = $.isFunction(item.data) ? item.data() : item.data;
            if (item.action && item.action === 'slide') {
                toggle(item);
            } else {
                if (item.pane)
                    pane.navigate(item.pane, clickData);
                else if (item.process)
                    Process[item.process](pane);
                else if (item.dialog)
                    T.dialog(item.dialog, { modal: true });
                else if (item.publish)
                    pubsub.publish(item.publish.message, item.publish.data);
            }
        };

        function toggle(tab) {
            if (!currentTab)
                open(tab);
            else if (currentTab === tab)
                close(currentTab);
            else {
                close(currentTab);
                open(tab);
            }
        }

        function open(tab) {
            $.when(tabLoaded(tab)).done(function () {
                implementation.open(tab);
                setSelectedTab(tab);
                currentTab = tab;
                pubsub.publish('tabOpened', panes[tab.text]);

                if (tab.closeOnNavigate)
                    pubsub.subscribeOnce('__navigate', function () {
                        close(tab);
                    });
            });
        }

        function close(tab) {
            implementation.close(tab);
            setSelectedTab();
            currentTab = null;
            pubsub.publish('tabClosed', panes[tab.text]);
        }

        function tabLoaded(tab) {
            if (panes[tab.text] == null) {
                var element = $('<div></div>').addClass('tabContent subpanel').appendTo(tabPanel);
                var context = T.context();
                var renderOperation = context.renderOperation;
                var node = T.appendNode(element, {
                    path: tab.pane,
                    data: tab.data,
                }, null, context);
                panes[tab.text] = node.pane;
                return renderOperation.promise;
            }
        }

        function setSelectedTab(tab) {
            $(pane.element).find('.tabSelected').removeClass('tabSelected');
            $(pane.element).find('.tabButton:eq(' + _.indexOf(self.tabs, tab) + ')').addClass('tabSelected');
        }

        function dockImplementation() {
            var implementations = {
                top: {
                    initialise: function () { },
                    tooltipPosition: 'below',
                    open: function (tab) {
                        $(panes[tab.text].element)
                            .css('min-width', $(pane.element).find('.tabButtonContainer').width() - 1)
                            .parent()
                            .stop(true, true)
                            .slideDown('fast');
                    },
                    close: function (tab) {
                        $(panes[tab.text].element).parent().slideUp('fast');
                    }
                },
                right: {
                    initialise: function () {
                        var $container = $('.rightTabPanel .tabButtonContainer');
                        $container.hover(function () {
                            $container.animate({ 'right': 0 }, 'fast');
                        }, function () {
                            $container.animate({ 'right': -63 }, 'fast');
                        });

                    },
                    tooltipPosition: 'left',
                    open: function (tab) {
                        $(panes[tab.text].element)
                            .css('min-height', $(pane.element).find('.tabButtonContainer').height())
                            .parent()
                            .stop(true, true)
                            .show('fast');
                    },
                    close: function (tab) {
                        $(panes[tab.text].element).parent().hide('fast');
                    }

                }
            };

            if (!implementations[dock])
                throw 'Dock type ' + dock + ' not implemented.';

            return implementations[dock];
        };

        pubsub.subscribe('closeTab', function (paneToClose) {
            if (currentTab && panes[currentTab.text] === paneToClose)
                close(currentTab);
        });

    });
})();
//@ sourceURL=tribe:///Common/Panes/tabPanel
T.scriptEnvironment = { resourcePath: '/Common/tooltip' };
(function () {
    T.registerModel(function (pane) {
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
                if (T.elementIsFixed($target)) {
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
            if (T.elementIsRightAligned($target)) {
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
            var $viewport = $(T.viewportElementFor($target));
            if (right > $viewport.width() - 5)
                return $viewport.width() - right - 5;

            return 0;
        }

        function elementRight(element) {
            return $(T.containingElementFor(element)).width() - $(element).position().left - $(element).width();
        }

    });
})();

//@ sourceURL=tribe:///Common/Panes/tooltip
T.scriptEnvironment = { resourcePath: '/Common/contentHeader' };
(function () {
    T.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;

        this.gradientClass = data.gradientClass ? data.gradientClass : 'gradientGreen';
        this.text = data.text;
        this.buttons = T.map(data.buttons || [], function (button) {
            return {
                click: button.click ? button.click : null,
                text: button.text ? button.text : null,
                visible: button.visible !== undefined ? button.visible : true
            };
        });
    });
})();
//@ sourceURL=tribe:///Common/Panes/contentHeader
T.scriptEnvironment = { resourcePath: '/Common/dropDown' };
(function () {
    // TODO: Refactor - the trigger and panel should be in separate panes. The rest is starting to get nasty now too...
    T.registerModel(function (pane) {
        var self = this;
        var data = pane.data;

        this.showTrigger = !data.trigger;

        var $inputElement;
        var $dropDownPanel;
        var $dropDownTrigger;

        var multipleSelect = data.multipleSelect === true;

        var items = ko.utils.unwrapObservable(data.items);
        items = data.itemFilter ? _.filter(items, data.itemFilter) : items;
        if (data.nullItemText)
            items.splice(0, 0, null);

        this.items = ko.observableArray(items);
        this.allowCreate = data.createFunction;

        this.displayText = function (item) {
            if (item === null || item === undefined)
                return data.nullItemText;

            if (data.itemText) {
                if ($.isFunction(data.itemText))
                    return data.itemText(item);
                else
                    return item[data.itemText];
            } else {
                return item;
            }
        };

        if (multipleSelect) {
            var initialValues = ko.utils.unwrapObservable(data.value);
            if (!$.isArray(initialValues))
                initialValues = initialValues ? [initialValues] : [];

            this.selectedItem = ko.observableArray(initialValues);
        } else
            this.selectedItem = ko.observable(ko.utils.unwrapObservable(data.value));

        this.selectedText = ko.dependentObservable(function () {
            if (multipleSelect)
                return self.displayText(self.selectedItem().join(", "));
            else
                return self.displayText(self.selectedItem());
        });

        this.isItemSelected = function (item) {
            if (multipleSelect)
                return this.selectedItem.indexOf(item) > -1;
            return this.selectedItem() === item;
        };

        this.paneRendered = function () {
            $inputElement = $(pane.element).find('.dropDownNewItem input');
            $dropDownPanel = $(pane.element).children('.dropDownPanel');
            $dropDownTrigger = data.trigger ? $(data.trigger) : $(pane.element).children('.dropDownTrigger');

            $dropDownTrigger.bind('click', handleClick);

            $inputElement
                .keydown(function (event) {
                    event.stopPropagation();
                    if (event.which == 27)
                        hideDropDown();
                })
                .keypress(function (event) {
                    event.stopPropagation();
                    if (event.which == 13)
                        self.createNew();
                });

            $(pane.element).click(function (event) { event.stopPropagation(); });
            $(document).click(hideDropDown);

            if (data.singleUse) showDropDown();
        };

        this.renderComplete = setPosition;

        function setPosition() {
            if (elementIsFixed($dropDownTrigger)) {
                var top = $dropDownTrigger.offset().top + $dropDownTrigger.height() - $(window).scrollTop();
                var left = $dropDownTrigger.offset().left;
                $dropDownPanel.css('position', 'fixed').offset({ left: left, top: top });
            } else {
                var top = $dropDownTrigger.position().top + $dropDownTrigger.height() - $(window).scrollTop();
                var left = $dropDownTrigger.position().left;
                $dropDownPanel.css({ left: left, top: top });
            }
        }

        function handleClick(event) {
            $dropDownTrigger = $(event.target);
            setPosition();
            toggleDropDown();
            event.stopPropagation();
        }

        function toggleDropDown() {
            if ($dropDownPanel.is(':visible'))
                hideDropDown();
            else
                showDropDown();
        };

        function showDropDown() {
            $dropDownPanel.slideDown('fast', function () {
                if (!Configuration.mobile()) $inputElement.focus();
                checkHorizontalPosition($dropDownPanel);
                checkVerticalPosition($dropDownPanel);
            });
        }

        function hideDropDown() {
            $(pane.element).children('.dropDownPanel').slideUp('fast', function () {
                if (data.singleUse)
                    self.dispose();
            });
        };

        this.selectItem = function (item) {
            if (multipleSelect) {
                var index = self.selectedItem.indexOf(item);
                if (index > -1)
                    self.selectedItem.splice(index, 1);
                else
                    self.selectedItem.push(item);
                if (ko.isObservable(data.value))
                    data.value(self.selectedItem());
            } else {
                //self.items.unshift(self.items.splice())
                self.selectedItem(item);
                if (ko.isObservable(data.value))
                    data.value(item);
                hideDropDown();
            }

            if (item && item.select) item.select(item);
        };

        this.createNew = function () {
            if (data.createFunction) {
                var inputValue = $inputElement.val();
                if (inputValue) {
                    var newItem = data.createFunction(inputValue);
                    $inputElement.val('');
                    self.items.push(newItem);
                    data.items.push(newItem);
                    self.selectItem(newItem);
                    hideDropDown();
                }
            }
        };

        this.dispose = function() {
            if (data.singleUse)
                pane.remove();
            $(document).unbind('click', hideDropDown);
        };
    });
})();
//@ sourceURL=tribe:///Common/Panes/dropDown
T.scriptEnvironment = { resourcePath: '/Common/expander' };
(function () {
    T.registerModel(function (pane) {
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

            //T.renderTooltips(self.tooltips, 'help', pane);
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
            childPane = T.appendNode($content, { path: data.pane, data: data.data }).pane;

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
//@ sourceURL=tribe:///Common/Panes/expander
T.scriptEnvironment = { resourcePath: '/Common/expanderList' };
(function () {
    T.registerModel(function (pane) {
        pane.node.skipPath = true;
        
        var pubsub = pane.pubsub;
        var data = pane.data;

        var self = this;
        
        this.expanders = data;

        this.renderComplete = function () {
            T.renderTooltips(self.tooltips, 'help', pane);
        };

        this.tooltips = {
            expanderList: {
                selector: '.expanderList',
                position: 'above',
                html: 'Click on any of these bars to expand the content'
            }
        };
    });
})();
//@ sourceURL=tribe:///Common/Panes/expanderList
T.scriptEnvironment = { resourcePath: '/Common/graph' };
(function () {
    T.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;

        var self = this;

        var options;
        var $graph;
        var $legend;
        var $plot;

        this.id = data.id ? data.id : T.getUniqueId();
        
        this.selectedSeries = ko.observableArray();
        this.availableSeries = extractPlayers(data.series);
        this.seriesSelectText = data.seriesSelectText ? data.seriesSelectText : "Select series:";
        this.showSeriesSelect = data.showSeriesSelect !== false;

        if (data.selectedSeriesKey)
            this.selectedSeries.extend({ persist: 'T.graph.' + data.selectedSeriesKey });

        this.selectedSeries.subscribe(function (value) {
            plot(extractSeries(data.series, ko.utils.unwrapObservable(value)));
        });

        this.paneRendered = function () {
            $graph = $(pane.element).find('.graph');
            $legend = $(pane.element).find('.legend');
            options = $.extend(true, { legend: { container: $legend } }, data.options);

            if (data.css)
                $graph.css(data.css);

            plot(extractSeries(data.series, self.selectedSeries()));
            T.renderTooltips(self.tooltips, 'help', pane);
        };

        pubsub.subscribe('graphDataUpdated', function(series) {
            if (self.id === series.id) update(series.series);
        });
        
        function plot(series) {
            $plot = $.plot($graph, series, options);
        }
        
        function update(data) {
            $plot.setData(data);
            $plot.setupGrid();
            $plot.draw();
        }

        function extractSeries(source, filter) {
            if ($.isArray(source))
                return data.modifier ? applyModifier(source, data.modifier) : source;

            if (filter && filter.length > 0)
                source = filterProperties(source, filter);

            return T.map(source, function (item, key) {
                return { data: data.modifier ? applyModifier(item, data.modifier) : item, label: key };
            });
        }

        function extractPlayers(source) {
            if ($.isArray(source))
                return [];
            return T.map(source, function (item, key) { return key; });
        }

        function filterProperties(source, propertyList) {
            var result = {};
            for (var i = 0; i < propertyList.length; i++)
                result[propertyList[i]] = source[propertyList[i]];
            return result;
        }

        function applyModifier(source, modifier) {
            var modifiers = {
                ongoingAverage: function (series) {
                    var count = 0;
                    var total = 0;
                    var result = [];
                    for (var i = 0; i < series.length; i++) {
                        count++;
                        total += series[i][1];
                        result.push([series[i][0], total / count]);
                    }
                    return result;
                },
                cumulative: function (series) {
                    var total = 0;
                    var result = [];
                    for (var i = 0; i < series.length; i++) {
                        total += series[i][1];
                        result.push([series[i][0], total]);
                    }
                    return result;
                }
            };

            return modifiers[modifier](source);
        }

        this.tooltips = {
            seriesSelect: {
                selector: '.graphSeriesSelect .display',
                position: 'right',
                html: 'Select what is being graphed with this dropdown'
            }
        };
    });
})();
//@ sourceURL=tribe:///Common/Panes/graph
T.scriptEnvironment = { resourcePath: '/Common/grid' };
TC = window.TC || {};
T.grid = T.grid || {};

(function () {
    T.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;
        var self = this;

        var grid = T.grid;
        var source = ko.utils.unwrapObservable(data.source);
        var id = T.Utils.getUniqueId();
        var columnList = extractColumnList();
        var lastSort;

        this.showHeader = data.showHeader !== false;
        this.columnList = columnList;
        this.groupings = ko.observableArray(extractGroupingList());
        this.headings = ko.observableArray(generateHeadings());
        this.filters = T.map(data.filters, function (filter) {
            return new grid.Filter(filter, id, pubsub);
        });

        this.rows = ko.observableArray(generateRows());
        this.unsortedRows = this.rows();

        this.sort = function (sort) {
            this.rows(generateRows(sort));
        };

        this.rowClick = function (item) {
            if (data.rowClick) {
                var sourceItem = source[deepIndexOf(this.unsortedRows, item)];
                data.rowClick(sourceItem);
            }
        };

        this.renderComplete = function () {
            T.renderTooltips(self.tooltips, 'help', pane);
        };

        pubsub.subscribe('filterChanged', function (filterData) {
            if (id === filterData.id)
                self.rows(generateRows(lastSort));
        });

        if (ko.isObservable(data.source))
            data.source.subscribe(function () {
                source = ko.utils.unwrapObservable(data.source);
                self.groupings(extractGroupingList());
                self.headings(generateHeadings());
                self.unsortedRows = generateRows();
                self.rows(generateRows(lastSort));
            });

        function generateRows(sort) {
            if (source) {
                var rows = grid.applyFilters(source, self.filters);
                rows = T.map(rows, generateRow);
                if (sort !== null && sort !== undefined)
                    rows = sortRows(rows, sort);
                return rows;
            } else
                return [];
        }

        function sortRows(source, sort) {
            lastSort = sort == lastSort ? null : sort;
            return source.sortBy(sort, sort == lastSort, primeSortValue);
        }

        function generateRow(item) {
            var row;
            if (data.columns)
                row = T.map(columnList, function (column) { return generateCell(item, column); });
            else
                row = cellValues(item);

            return row;
        }

        function generateCell(item, column) {
            var value = !column.property ? '' :
                $.isFunction(column.property) ?
                    column.property(item) :
                    T.Utils.evaluateProperty(item, column.property);
            return { display: formatCell(value), value: value, cssClass: getCellClass(value, column) };
        }

        function getCellClass(value, column) {
            if (checkboxYes(value, column))
                return 'icon iconTick';
            if (checkboxNo(value, column))
                return 'icon';
            return '';
        }

        function checkboxYes(value, column) {
            return (column && column.type === 'checkbox' && value) ||
                (value && value.constructor === String && value.toLowerCase() === 'true') ||
                value === true;
        }

        function checkboxNo(value, column) {
            return (column && column.type === 'checkbox' && !value) ||
                (value && value.constructor === String && value.toLowerCase() === 'false') ||
                (value === false);
        }

        function formatCell(value) {
            if (value === null || value === undefined)
                return ' ';
            if (value.constructor === Date)
                return Dates.formatDate(value);
            return value;
        }

        function primeSortValue(cell) {
            if (cell.value === null)
                return null;
            if (cell.value.constructor === String)
                return cell.value.toUpperCase();
            return cell.value;
        }

        function generateHeadings() {
            if (data.columns)
                return T.map(columnList, function (column) { return column.heading; });
            else
                return source && propertyNames(source[0]);
        }

        function extractColumnList() {
            var list = [];
            for (index in data.columns) {
                var item = data.columns[index];
                if (item.grouping)
                    list = list.concat(item.columns);
                else if (item.heading || item.property)
                    list.push(item);
            }
            return list;
        }

        function extractGroupingList() {
            var groupingList = [];
            var emptyColumnCount = 0;

            for (index in data.columns) {
                if (data.columns[index].grouping) {
                    if (emptyColumnCount)
                        groupingList.push({ grouping: '', columnCount: emptyColumnCount });

                    groupingList.push({ grouping: data.columns[index].grouping, columnCount: data.columns[index].columns.length });
                    emptyColumnCount = 0;
                } else {
                    emptyColumnCount++;
                }
            }
            return groupingList;
        }

        function cellValues(item) {
            var result = [];
            for (var property in item)
                if (!isFunction(item[property]))
                    result.push(generateCell(item, { property: property }));
            return result;
        }

        function propertyNames(item) {
            var returnArray = new Array();
            for (var property in item)
                if (!isFunction(item[property]))
                    returnArray.push(property);

            return returnArray;
        }

        this.tooltips = {
            rowClick: {
                selector: '.grid',
                position: 'right',
                html: 'Clicking on a row in most grids will take you to a page for the corresponding item'
            },
            sort: {
                selector: '.grid',
                position: 'above',
                html: 'All grids can be sorted by clicking on the column name'
            }
        };
    });
})();

(function () {
    var grid = T.grid;

    grid.Filter = function (fieldProperties, id, pubsub) {
        $.extend(this, fieldProperties);
        this.value = ko.observable(fieldProperties.defaultValue);

        this.value.subscribe(function () {
            if (pubsub)
                pubsub.publish('filterChanged', { id: id, filter: this });
        });
    };

    grid.applyFilters = function (source, filters) {
        // funky use of ternaries here is so if there are no filters defined, we don't copy the source array
        var filtered;
        T.each(filters, function (filter) {
            var value = filter.value();
            if (filter.filterFunction && value !== null && value !== undefined)
                filtered = T.filter(filtered ? filtered : source, executeFilterFunction);

            function executeFilterFunction(item) {
                return filter.filterFunction(item, filter.value());
            }
        });
        return filtered ? filtered : source;
    };
})();
//@ sourceURL=tribe:///Common/Panes/grid
T.scriptEnvironment = { resourcePath: '/Common/tabs' };
T.registerModel(function (pane) {
    var self = this;

    this.content = ko.observable();
    this.tabs = T.map(pane.data.tabs, mapTab);

    this.renderComplete = function() {
        self.select(self.tabs[0]);
    };

    this.select = function (tab) {
        self.content(tab.content);
        setActive(tab);
        if (pane.data.tabSelected)
            pane.data.tabSelected(tab);
    };

    function mapTab(tab) {
        return {
            header: tab.header,
            content: tab.content,
            active: ko.observable(false)
        };
    }
    
    function setActive(activeTab) {
        T.each(self.tabs, function(tab) {
            tab.active(tab === activeTab);
        });
    }
});
//@ sourceURL=tribe:///Common/Panes/tabs

ko.bindingHandlers.colspan = {
    update: function (element, valueAccessor) {
        $(element).attr('colspan', valueAccessor());
    }
};
//@ sourceURL=tribe:///Common/Infrastructure/colspanBindingHandler

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
                T.logger.debug("Element is aligned right by position (" + $(target).css('right') + "): " + $(element).attr('class'));
                return target;
            }
            if ($(target).css('float') === 'right') {
                T.logger.debug("Element is aligned right by float: " + $(element).attr('class'));
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
})(T.Utils);

//@ sourceURL=tribe:///Common/Infrastructure/elements

(function() {
    // based on http://stackoverflow.com/questions/979256/how-to-sort-an-array-of-javascript-objects
    function sortBy(field, reverse, primer) {
        function key(x) { return primer ? primer(x[field]) : x[field]; };

        return function (a, b) {
            var A = key(a), B = key(b);
            return ((A < B) ? -1 :
                    (A > B) ? +1 : 0) * [-1, 1][+!!reverse];
        };
    }

    Array.prototype.sortBy = function (field, reverse, primer) {
        return this.sort(sortBy(field, reverse, primer));
    };
})();
//@ sourceURL=tribe:///Common/Infrastructure/sortBy

(function () {
    var utils = T.Utils;

    T.tooltipTimeout = 5000;

    ko.bindingHandlers.tooltip = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            var bindings = allBindingsAccessor();

            if (value) {
                var data;
                if (value.constructor === String)
                    data = { html: value, target: $(element), position: bindings.position };
                else
                    data = value;
                T.createNode(element, { path: '/Common/tooltip', data: data }, utils.extractNode(bindingContext));
            }

        }
    };

    T.renderTooltips = function (tooltips, topic, parentPane, show) {
        if ($.isArray(tooltips))
            for (var i = 0; i < tooltips.length; i++)
                renderTooltip(tooltips[i], true);
        else
            for (var property in tooltips)
                if (tooltips.hasOwnProperty(property)) {
                    renderTooltip(tooltips[property], show !== false);// && Store(tipShownKey(property)) !== true);
                    //if (show !== false)
                    //    Store(tipShownKey(property), true);
                }

        function renderTooltip(tooltip, autoShow) {
            var target = $(parentPane.element).find(tooltip.selector);
            if (target.length > 0) {
                if (parentPane.element)
                    T.insertNodeAfter(target, { path: '/Common/tooltip', data: extend(tooltip, autoShow) });
            } else {
                T.logger.warn("Tooltip for selector " + tooltip.selector + " not rendered - element not found");
            }
        }

        function extend(tooltip, autoShow) {
            return $.extend({ timeout: T.tooltipTimeout, topic: topic, autoShow: autoShow && !tooltip.hover, target: $(parentPane.element).find(tooltip.selector) }, tooltip);
        }

        function tipShownKey(property) {
            return "tooltip.shown: " + parentPane.path + '.' + property;
        }
    };

})();
//@ sourceURL=tribe:///Common/Infrastructure/tooltipBindingHandler
$('head').append('<script type="text/template" id="template--Common-dialog"><div class="dialog borderBlack rounded shadowLarge" data-bind="attr: { id: id }">\n    <div class="closeButton" data-bind="click: closeDialog, visible: showCloseButton"></div>\n    <div class="dialogContent">\n        <div class="dialogHeader"></div>        \n        <div class="dialogPane" data-bind="pane: pane"></div>\n    </div>\n</div>\n<div class="dialog loadingDialog rounded shadow">\n    <h2>Loading...</h2>\n</div>\n<div class="dialogBackgroundFilter"></div></script>\n<script type="text/template" id="template--Common-tabPanel"><div class="tabPanel">\n    <div class="tabButtonContainer">\n        <ul data-bind="foreach: tabs">\n            <!-- ko if: ($parent.loggedOn() ? $data.authenticated !== false : $data.anonymous !== false)  && (!$data.visible || $data.visible()) -->\n            <li class="tabButton" data-bind="cssClass: $data.cssClass, click: $parent.click, tooltip: $data.tooltip ? $data.tooltip : \'\', position: $parent.tooltipPosition">\n                <div class="tabButtonIcon" data-bind="cssClass: $data.icon" />\n                <div class="tabButtonText" data-bind="html: text"></div>   \n            </li>\n            <!-- /ko -->\n        </ul>\n    </div>\n</div>\n</script>\n<script type="text/template" id="template--Common-tooltip"><div class="tooltip">\n    <div class="tooltipArrow"></div>\n    <div class="tooltipContent rounded shadow gradientBlack gradient" data-bind="html: html"></div>\n</div></script>\n<script type="text/template" id="template--Common-contentHeader"><div class="contentHeader roundedTop gradient" data-bind="cssClass: gradientClass">\n    <ul>\n        <li class="heading"><span data-bind="text: text"></span></li>\n        <div data-bind="foreach: buttons">\n            <li class="right button" data-bind="click: click, visible: visible"><a data-bind="text: text"></a></li>\n        </div>\n    </ul>\n</div>\n</script>\n<script type="text/template" id="template--Common-dropDown"><div class="dropDownTrigger roundedSmall borderDark" data-bind="visible: showTrigger">\n    <span data-bind="text: selectedText"></span>\n    <div class="dropDownIcon smallArrowDown"></div>\n</div>\n\n<div class="dropDownPanel rounded subpanel">\n    <!-- ko if: allowCreate -->\n        <div><span>Create new:</span></div>\n        <div class="dropDownNewItem"><input type="text" /></div>\n    <!-- /ko -->\n        \n    <!-- ko if: items() && items().length > 0 -->\n        <div style="clear: left"><span>Select:</span></div>\n        <div style="clear: left" data-bind="foreach: items">\n            <div class="listItem" data-bind="click: $parent.selectItem, css: { selected: $parent.isItemSelected($data) }">\n                <span style="white-space: nowrap" data-bind="html: $parent.displayText($data)"></span>\n                <div style="float: right" />\n            </div>\n        </div>\n    <!-- /ko -->\n</div>\n</script>\n<script type="text/template" id="template--Common-expander"><div class="expander rounded borderLight" data-bind="css: { expanded: expanded }">\n    <div class="expanderHeader gradientGreen roundedTop roundedBottom" data-bind="click: click">        \n        <div class="arrow smallArrowDown"></div>\n        <div class="icon" />\n        <span class="headerText" data-bind="text: headerText"></span>\n        <!--<div class="iconPrint" data-bind="click: print"></div>-->\n    </div>\n    <div class="expanderContent roundedBottom">\n    </div>\n</div></script>\n<script type="text/template" id="template--Common-expanderList"><div class="expanderList" data-bind="foreach: expanders">\n    <div class="expanderContainer" data-bind="pane: \'/Common/expander\', data: $data"></div>\n</div></script>\n<script type="text/template" id="template--Common-graph"><div class="graphSeriesSelect" data-bind="visible: showSeriesSelect, displayText: seriesSelectText, selectField: selectedSeries, items: availableSeries, multipleSelect: true"></div>\n<div class="graphContainer" style="overflow: hidden; clear: left">\n    <div class="graph" style="float: left"></div>\n    <div class="legend" style="float: left"></div>\n</div></script>\n<script type="text/template" id="template--Common-grid"><!-- ko if: filters -->\n<div data-bind="foreach: filters" class="grid-filters">\n    <div data-bind="field: $data" class="grid-filter"></div>\n</div>\n<!-- /ko -->\n<div style="clear: left"></div>\n<div class="gridContainer">\n    <table class="grid" data-bind="if: $data.rows().length > 0">\n        <thead data-bind="visible: showHeader">\n            <!-- ko if: groupings().length > 0 -->\n            <tr class="grid-grouping" data-bind="foreach: groupings">\n                <!-- ko if: grouping == \'\' -->\n                <th data-bind="colspan: columnCount"></th>\n                <!-- /ko -->\n                <!-- ko if: grouping != \'\' -->\n                <th class="grid-grouping-item" data-bind="html: grouping, colspan: columnCount"></th>\n                <!-- /ko -->\n            </tr>\n            <!-- /ko -->\n\n            <tr class="grid-column-list grid-header" data-bind="foreach: headings">\n                <th class="grid-header-item" data-bind="html: $data, click: function (data, event) { $parent.sort($(event.currentTarget).index()); }"></th> \n            </tr>\n        </thead>\n\n        <tbody data-bind="foreach: rows">\n            <tr class="grid-column-list grid-row" data-bind="foreach: $data, click: function () { $parent.rowClick($data); }">\n                <td class="grid-row-item" data-bind="cssClass: cssClass">\n                    <span data-bind="html: $data.display"></span>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div></script>\n<script type="text/template" id="template--Common-tabs"><div class="tabs">\n    <div class="tabList" data-bind="foreach: tabs">\n        <div class="tab gradientGreen" data-bind="text: header, click: $root.select, css: { active: active }"></div>\n    </div>\n    <div class="tabContent" data-bind="html: content"></div>\n</div></script>\n');
$('<style/>')
    .attr('class', '__tribe')
    .text('.dialog{position:fixed;background-color:#fff;z-index:100;overflow:visible}.dialogHeader{margin-top:1px}.dialogContent{position:relative;overflow:visible;z-index:1}.closeButton{position:absolute;right:3px;top:0;width:47px;height:18px;background-image:url(images/close.png);z-index:10}.closeButton:hover{background-image:url(images/close.active.png);-webkit-border-bottom-right-radius:3px;-webkit-border-bottom-left-radius:3px;-moz-border-radius-bottomright:3px;-moz-border-radius-bottomleft:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px;box-shadow:0 0 8px #f55;-moz-box-shadow:0 0 8px #f55;-webkit-box-shadow:0 0 8px #f55}.loadingDialog{padding:20px 80px 20px 80px}.dialogBackgroundFilter{position:fixed;top:0;bottom:0;left:0;right:0;overflow:hidden;padding:0;margin:0;background-color:gray;filter:alpha(opacity=60);opacity:.6;z-index:99;display:none}.tabPanel{position:fixed;z-index:10}.tabPanel ul{margin:0;padding:0;list-style-type:none}.tabPanel .tabContent{display:none;overflow:visible}.tabPanel .tabButtonContainer{}.tabPanel .tabButton{display:block;font-size:16px;font-weight:bold;text-align:center;cursor:pointer;color:#000;z-index:11}.tabPanel .tabButton .tabButtonIcon{width:0;height:0}.tabPanel .tabSelected{}.tabPanel .tabButtonText{white-space:nowrap}.rightTabPanel{top:100px;right:0;-webkit-border-top-left-radius:6px;-webkit-border-bottom-left-radius:6px;-moz-border-radius-topleft:6px;-moz-border-radius-bottomleft:6px;border-top-left-radius:6px;border-bottom-left-radius:6px}.rightTabPanel .tabButtonContainer{position:absolute;right:-63px;top:50px;z-index:100;-webkit-border-top-left-radius:6px;-webkit-border-bottom-left-radius:6px;-moz-border-radius-topleft:6px;-moz-border-radius-bottomleft:6px;border-top-left-radius:6px;border-bottom-left-radius:6px}.rightTabPanel .tabButton{width:85px;height:25px;padding:5px;background:#f0f5e1;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIxJSIgc3RvcC1jb2xvcj0iI2YwZjVlMSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNiNWJhYjIiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(1%,rgba(240,245,225,1)),color-stop(100%,rgba(181,186,178,1)));background:-webkit-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:-o-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:-ms-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#f0f5e1\',endColorstr=\'#b5bab2\',GradientType=0);border:1px solid #ccc;box-shadow:3px 3px 3px rgba(0,0,0,.3);-moz-box-shadow:3px 3px 3px rgba(0,0,0,.3);-webkit-box-shadow:3px 3px 3px rgba(0,0,0,.3);-webkit-border-top-left-radius:6px;-webkit-border-bottom-left-radius:6px;-moz-border-radius-topleft:6px;-moz-border-radius-bottomleft:6px;border-top-left-radius:6px;border-bottom-left-radius:6px;margin-bottom:10px}.rightTabPanel ul{margin-bottom:-5px}.rightTabPanel .tabSelected{}.rightTabPanel .tabButton:hover{color:#cfa700}.rightTabPanel .tabButtonText{margin-top:2px;padding-left:2px;margin-right:-2px;float:left}.rightTabPanel .tabContent{position:absolute;right:0;padding:20px;padding-right:50px;-webkit-border-bottom-left-radius:12px;-moz-border-radius-bottomleft:12px;border-bottom-left-radius:12px;-webkit-border-top-left-radius:12px;-moz-border-radius-topleft:12px;border-top-left-radius:12px}.rightTabPanel .tabButtonIcon{float:left;width:16px;height:16px;margin:5px}.topTabPanel{top:0;right:45px;margin-top:-1px;z-index:11}.desktop .topTabPanel{-webkit-border-bottom-right-radius:6px;-webkit-border-bottom-left-radius:6px;-moz-border-radius-bottomright:6px;-moz-border-radius-bottomleft:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;box-shadow:3px 3px 3px rgba(0,0,0,.3);-moz-box-shadow:3px 3px 3px rgba(0,0,0,.3);-webkit-box-shadow:3px 3px 3px rgba(0,0,0,.3)}.desktop .topTabPanel .tabButtonContainer li:last-child{-webkit-border-bottom-left-radius:6px;-moz-border-radius-bottomleft:6px;border-bottom-left-radius:6px}.desktop .topTabPanel .tabButtonContainer li:first-child{-webkit-border-bottom-right-radius:6px;-moz-border-radius-bottomright:6px;border-bottom-right-radius:6px}.topTabPanel .tabButton{float:right;height:21px;width:75px;padding:10px 15px;padding-top:7px;border-left:1px solid #ccc;border-right:1px solid #ccc;margin-left:-1px;background:#eef1f1}.desktop .topTabPanel .tabButton{background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2VlZjFmMSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNkMGRjZGMiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(238,241,241,1) 0%,rgba(208,220,220,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(238,241,241,1)),color-stop(100%,rgba(208,220,220,1)));background:-webkit-linear-gradient(top,rgba(238,241,241,1) 0%,rgba(208,220,220,1) 100%);background:-o-linear-gradient(top,rgba(238,241,241,1) 0%,rgba(208,220,220,1) 100%);background:-ms-linear-gradient(top,rgba(238,241,241,1) 0%,rgba(208,220,220,1) 100%);background:linear-gradient(top,rgba(238,241,241,1) 0%,rgba(208,220,220,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#eef1f1\',endColorstr=\'#d0dcdc\',GradientType=0)}.mobile .topTabPanel .tabButton{border-bottom:1px solid #ccc}.topTabPanel .tabButton:hover{}.topTabPanel .tabContent{position:absolute;top:0;right:0;z-index:-1;margin-left:1px;padding-top:33px;border:1px solid #ccc}.desktop .topTabPanel .tabContent{-webkit-border-bottom-left-radius:6px;-moz-border-radius-bottomleft:6px;border-bottom-left-radius:6px;-webkit-border-bottom-right-radius:6px;-moz-border-radius-bottomright:6px;border-bottom-right-radius:6px;box-shadow:3px 3px 3px rgba(0,0,0,.3);-moz-box-shadow:3px 3px 3px rgba(0,0,0,.3);-webkit-box-shadow:3px 3px 3px rgba(0,0,0,.3)}.tooltip{font-family:\'Segoe UI\',"Trebuchet MS",Arial,Helvetica,Verdana,sans-serif;font-weight:normal;font-size:16px;display:none}.tooltipArrow{position:absolute;z-index:100}.tooltipContent{color:#fff;position:absolute;font-size:15px;border:#000 1px solid;padding:4px 8px 6px 8px;z-index:100}@media print{.tooltip{display:none}}.contentHeader{overflow:hidden;font-size:13px;margin-bottom:5px}.contentHeader ul{margin:0;padding:0;list-style-type:none;-webkit-border-top-right-radius:6px;-moz-border-radius-topright:6px;border-top-right-radius:6px;-webkit-border-top-left-radius:6px;-moz-border-radius-topleft:6px;border-top-left-radius:6px}.contentHeader ul li{float:left;display:block;padding:10px 15px}.contentHeader ul li.heading{padding-top:7px;font-size:1.2em;font-weight:bold}.desktop .contentHeader ul li.heading{text-shadow:0 1px 0 white}.contentHeader ul li.right{float:right}.contentHeader ul li.button{cursor:pointer}.contentHeader ul li.right.button{border-left:1px solid #ccc}.contentHeader ul li a{text-decoration:underline;color:#111}.contentHeader ul li a:hover{text-decoration:underline;color:blue}.dropDownTrigger{position:relative;font-family:Arial;font-size:13px;margin:0;padding-top:2px;padding-left:3px;height:18px;width:150px;overflow:hidden;cursor:pointer}.dropDownTrigger span{white-space:nowrap}.dropDownIcon{position:absolute;right:0;top:2px;background-color:#fff;margin-top:6px;margin-right:6px}.dropDownPanel{position:absolute;padding:3px;overflow:auto;display:none;z-index:1}.dropDownPanel input{margin:5px 3px}.dropDownNewItem{float:left}.listItem{width:auto;background-color:#ccc;margin-bottom:5px;height:31px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;cursor:pointer;overflow:hidden}.listItem span{display:block;overflow:hidden;padding:5px 10px;color:#000}.listItem input{width:auto;font-family:\'Segoe UI\',"Trebuchet MS",Arial,Helvetica,Verdana,sans-serif;height:29px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;border:1px solid #999;padding:0 0 0 5px;font-size:inherit;outline:none}.listItem:hover{background-color:#a9a9a9;color:#fff}.listItem.selected{background-color:#bce}.expander{position:relative}.expanderHeader{height:25px;padding:5px;cursor:pointer;-webkit-transform:translateZ(0);-webkit-backface-visibility:hidden;-webkit-perspective:1000}.expanderContent{padding:0 10px 10px 10px;display:none;background:#fff;-webkit-transform:translateZ(0);-webkit-backface-visibility:hidden;-webkit-perspective:1000}.expanderHeader .headerText{margin-left:6px}.expanderHeader .arrow{float:left;width:0;height:0;margin-left:5px;margin-right:5px}.expanderHeader .icon{float:left;margin-top:4px;margin-left:4px;width:16px;height:16px}.expanderHeader .iconGraph{background-image:url(images/icon.graph.png)}.expanderHeader .iconGrid{background-image:url(images/icon.grid.png)}.expanderHeader .iconList{background-image:url(images/icon.list.png)}.expanderHeader .smallArrowDown{margin-top:10px;margin-left:6px}.expanderHeader .smallArrowUp{margin-top:5px;margin-left:6px}.expander .iconPrint{display:none;float:right;margin-top:4px;margin-right:4px}.expander.expanded .iconPrint{display:block}.expanderList{padding:10px}.expanderContainer:nth-child(n+2) .expander{margin-top:10px}.graphContainer{margin-top:5px}.graph{width:800px;height:450px}.embedded .graph{width:500px;height:350px}.main .graph{width:272px;height:100px}.desktop .gridContainer{overflow:auto}.mobile .gridContainer{overflow:hidden}.grid{font-size:.85em;clear:left}.grid-filter{float:left;padding-right:20px}.grid-filter .label{width:auto;margin-right:10px}.grid-grouping{}.grid-grouping-item{font-weight:bold;background-color:#ddd;text-align:center}.grid-header{}.grid-header-item{font-weight:bold;background-color:#ddd;cursor:pointer}.grid-header-item:hover{background-color:#bbb;color:#000}.grid-row{cursor:pointer}.grid-row:hover .grid-row-item{background-color:#ccc;color:#000}.grid-row-item{background-color:#eee;text-align:right;background-repeat:no-repeat;background-position:center}.grid-row-selected .grid-row-item{background-color:#333;color:#fff}.grid-row-item.icon{font-size:0}.tabList .tab{float:left;padding:10px 20px;border:1px solid grey;border-top-left-radius:6px;border-top-right-radius:6px;margin:0 5px -1px 5px}.tabList .tab.active{background:#fff;border-bottom:1px solid #fff}.tabContent{clear:both;padding:10px;border:1px solid grey}.smallArrowUp{border:4px solid transparent;border-bottom-color:#999;height:0;width:0}.smallArrowDown{border:4px solid transparent;border-top-color:#999;height:0;width:0}.smallArrowLeft{border:4px solid transparent;border-right-color:#999;height:0;width:0}.smallArrowRight{border:4px solid transparent;border-left-color:#999;height:0;width:0}.arrowUp{border:6px solid transparent;border-bottom-color:#000;height:0;width:0}.arrowDown{border:6px solid transparent;border-top-color:#000;height:0;width:0}.arrowLeft{border:6px solid transparent;border-right-color:#000;height:0;width:0}.arrowRight{border:6px solid transparent;border-left-color:#000;height:0;width:0}button{-moz-box-shadow:inset 0 1px 0 0 #fff;-webkit-box-shadow:inset 0 1px 0 0 #fff;box-shadow:inset 0 1px 0 0 #fff;background:-webkit-gradient(linear,left top,left bottom,color-stop(.05,#ededed),color-stop(1,#dfdfdf));background:-moz-linear-gradient(center top,#ededed 5%,#dfdfdf 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ededed\',endColorstr=\'#dfdfdf\');background-color:#ededed;-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;border:1px solid #dcdcdc;display:inline-block;color:#777;font-size:15px;font-weight:bold;font-family:\'Segoe UI\',Arial,"Trebuchet MS",Helvetica,Verdana,sans-serif;padding:6px 24px;margin:2px;text-decoration:none;text-shadow:1px 1px 0 #fff;vertical-align:top}button:hover{background:-webkit-gradient(linear,left top,left bottom,color-stop(.05,#dfdfdf),color-stop(1,#ededed));background:-moz-linear-gradient(center top,#dfdfdf 5%,#ededed 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#dfdfdf\',endColorstr=\'#ededed\');background-color:#dfdfdf}button:active{-moz-box-shadow:inset 1px 1px 0 0 #ededed;-webkit-box-shadow:inset 1px 1px 0 0 #ededed;box-shadow:inset 1px 1px 0 0 #ededed;padding:7px 23px 5px 25px}button::-moz-focus-inner,input[type="reset"]::-moz-focus-inner,input[type="button"]::-moz-focus-inner,input[type="submit"]::-moz-focus-inner,input[type="file"]>input[type="button"]::-moz-focus-inner{padding:0;margin:0;border:0}button:disabled{background:#ededed;padding-top:4px;text-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none;box-shadow:none;color:#999}button:disabled:hover{background:#ededed}button:disabled:active{margin-top:0}button div{display:inline-block;margin-left:15px}.gradientGreen{background:#f0f5e1;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIxJSIgc3RvcC1jb2xvcj0iI2YwZjVlMSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNiNWJhYjIiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(1%,rgba(240,245,225,1)),color-stop(100%,rgba(181,186,178,1)));background:-webkit-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:-o-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:-ms-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#f0f5e1\',endColorstr=\'#b5bab2\',GradientType=0)}.gradientYellow{background:#ffe4a0;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIxJSIgc3RvcC1jb2xvcj0iI2ZmZTRhMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNhZmFmYWYiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(1%,rgba(255,228,160,1)),color-stop(100%,rgba(175,175,175,1)));background:-webkit-linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);background:-o-linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);background:-ms-linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);background:linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffe4a0\',endColorstr=\'#afafaf\',GradientType=0)}.gradientBlue{background:#add8e6;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2FkZDhlNiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNhZmFmYWYiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(173,216,230,1)),color-stop(100%,rgba(175,175,175,1)));background:-webkit-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);background:-o-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);background:-ms-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);background:linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#add8e6\',endColorstr=\'#afafaf\',GradientType=0)}.gradientReverseBlue{background:#add8e6;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2FkZDhlNiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNkN2UyZTUiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(173,216,230,1)),color-stop(100%,rgba(215,226,229,1)));background:-webkit-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);background:-o-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);background:-ms-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);background:linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#add8e6\',endColorstr=\'#d7e2e5\',GradientType=0)}.gradientBlack{background:#45484d;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQ1NDg0ZCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(69,72,77,1)),color-stop(100%,rgba(0,0,0,1)));background:-webkit-linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);background:-o-linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);background:-ms-linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);background:linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#45484d\',endColorstr=\'#000000\',GradientType=0)}.iconLoading{background-image:url(images/loading16.gif)!important;width:16px;height:16px}.iconCheckboxNo{background-image:url(images/checkbox_no.png)!important;width:16px;height:16px}.iconCheckboxYes{background-image:url(images/checkbox_yes.png)!important;width:16px;height:16px}.iconTick{background-image:url(images/tick_circle.png)!important;width:16px;height:16px}.iconSettings{background-image:url(images/icon.cog.png)!important;width:16px;height:16px}.iconHelp{background-image:url(images/icon.help.png)!important;width:16px;height:16px}.iconPrint{background-image:url(images/icon.print.png)!important;width:16px;height:16px}.iconDownload{background-image:url(images/icon.download.png)!important;width:16px;height:16px}.iconTips{background-image:url(images/icon.tips.png)!important;width:22px;height:22px}')
    .appendTo('head');

TC.scriptEnvironment = { resourcePath: '/Common/dialog' };
(function () {
    TC.registerModel(function (pane) {
        pane.node.skipPath = true;
        
        var self = this;
        var pubsub = pane.pubsub;
        var data = pane.data;
        var options = data.options ? data.options : {};

        this.pane = data.pane;
        this.id = options.id ? options.id : uuid.v4();
        this.showCloseButton = options.showCloseButton !== false;

        var dialogSelector = '#' + this.id;

        if (options.showLoadingDialog)
            centerDialog('.loadingDialog');

        if (options.closeOnNavigate)
            pubsub.subscribeOnce('navigating', closeDialog);

        this.paneRendered = function() {
            if (options.title)
                TC.createNode(pane.find('.dialogHeader'), { path: '/Common/contentHeader', data: { text: options.title } });
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
                $.when(TC.Utils.elementDestroyed($(dialogSelector + ' .dialogPane'))).done(function() {
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

TC.dialog = function (pane, options) {
    options = options || {};
    var element = options.element ? $(options.element) : 'body';
    pane = typeof (pane) == 'string' ? { path: pane } : pane;
    options.id = options.id ? options.id : uuid.v4();
    var title = ko.observable(options.title);
    options.title = options.title && title;

    var node = TC.appendNode(element, { path: '/Common/dialog', id: options.id, data: { pane: pane, options: options } }, options.node);
    return {
        node: node,
        close: node.pane.remove,
        transitionTo: function (paneOptions, newTitle) {
            title(newTitle);
            node.children[0].transitionTo(paneOptions);
        }
    };
};
TC.overlay = TC.dialog;

TC.Types.Pane.prototype.dialog = function (pane, options) {
    return TC.dialog(pane, $.extend({ node: this.node }, options));
};
//@ sourceURL=/Common/Panes/dialog
TC.scriptEnvironment = { resourcePath: '/Common/tabPanel' };
// needs a big ol' refactor
(function () {
    TC.registerModel(function (pane) {
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
            var clickData = _.isFunction(item.data) ? item.data() : item.data;
            if (item.action && item.action === 'slide') {
                toggle(item);
            } else {
                if (item.pane)
                    pane.navigate(item.pane, clickData);
                else if (item.process)
                    Process[item.process](pane);
                else if (item.dialog)
                    TC.dialog(item.dialog, { modal: true });
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
                var context = TC.context();
                var renderOperation = context.renderOperation;
                var node = TC.appendNode(element, {
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
//@ sourceURL=/Common/Panes/tabPanel
TC.scriptEnvironment = { resourcePath: '/Common/tooltip' };
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

//@ sourceURL=/Common/Panes/tooltip
TC.scriptEnvironment = { resourcePath: '/Common/contentHeader' };
(function () {
    TC.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;

        this.gradientClass = data.gradientClass ? data.gradientClass : 'gradientGreen';
        this.text = data.text;
        this.buttons = _.map(data.buttons, function (button) {
            return {
                click: button.click ? button.click : null,
                text: button.text ? button.text : null,
                visible: button.visible !== undefined ? button.visible : true
            };
        });
    });
})();
//@ sourceURL=/Common/Panes/contentHeader
TC.scriptEnvironment = { resourcePath: '/Common/dropDown' };
(function () {
    // TODO: Refactor - the trigger and panel should be in separate panes. The rest is starting to get nasty now too...
    TC.registerModel(function (pane) {
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
                if (_.isFunction(data.itemText))
                    return data.itemText(item);
                else
                    return item[data.itemText];
            } else {
                return item;
            }
        };

        if (multipleSelect) {
            var initialValues = ko.utils.unwrapObservable(data.value);
            if (!_.isArray(initialValues))
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
//@ sourceURL=/Common/Panes/dropDown
TC.scriptEnvironment = { resourcePath: '/Common/expander' };
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
//@ sourceURL=/Common/Panes/expander
TC.scriptEnvironment = { resourcePath: '/Common/expanderList' };
(function () {
    TC.registerModel(function (pane) {
        pane.node.skipPath = true;
        
        var pubsub = pane.pubsub;
        var data = pane.data;

        var self = this;
        
        this.expanders = data;

        this.renderComplete = function () {
            TC.renderTooltips(self.tooltips, 'help', pane);
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
//@ sourceURL=/Common/Panes/expanderList
TC.scriptEnvironment = { resourcePath: '/Common/graph' };
(function () {
    TC.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;

        var self = this;

        var options;
        var $graph;
        var $legend;
        var $plot;

        this.id = data.id ? data.id : uuid.v4();
        
        this.selectedSeries = ko.observableArray();
        this.availableSeries = extractPlayers(data.series);
        this.seriesSelectText = data.seriesSelectText ? data.seriesSelectText : "Select series:";
        this.showSeriesSelect = data.showSeriesSelect !== false;

        if (data.selectedSeriesKey)
            this.selectedSeries.extend({ persist: 'TC.graph.' + data.selectedSeriesKey });

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
            TC.renderTooltips(self.tooltips, 'help', pane);
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
            if (_.isArray(source))
                return data.modifier ? applyModifier(source, data.modifier) : source;

            if (filter && filter.length > 0)
                source = filterProperties(source, filter);

            return _.map(source, function (item, key) {
                return { data: data.modifier ? applyModifier(item, data.modifier) : item, label: key };
            });
        }

        function extractPlayers(source) {
            if (_.isArray(source))
                return [];
            return _.map(source, function (item, key) { return key; });
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
//@ sourceURL=/Common/Panes/graph
TC.scriptEnvironment = { resourcePath: '/Common/grid' };
namespace('TC.grid');
(function () {
    TC.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;
        var self = this;

        var grid = TC.grid;
        var source = ko.utils.unwrapObservable(data.source);
        var id = uuid.v4();
        var columnList = extractColumnList();
        var lastSort;

        this.showHeader = data.showHeader !== false;
        this.columnList = columnList;
        this.groupings = ko.observableArray(extractGroupingList());
        this.headings = ko.observableArray(generateHeadings());
        this.filters = _.map(data.filters, function (filter) {
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
            TC.renderTooltips(self.tooltips, 'help', pane);
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
                rows = _.map(rows, generateRow);
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
                row = _.map(columnList, function (column) { return generateCell(item, column); });
            else
                row = cellValues(item);

            return row;
        }

        function generateCell(item, column) {
            var value = !column.property ? '' :
                $.isFunction(column.property) ?
                    column.property(item) :
                    TC.Utils.evaluateProperty(item, column.property);
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
                return _.map(columnList, function (column) { return column.heading; });
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
    var grid = TC.grid;

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
        _.each(filters, function (filter) {
            var value = filter.value();
            if (filter.filterFunction && value !== null && value !== undefined)
                filtered = _.filter(filtered ? filtered : source, executeFilterFunction);

            function executeFilterFunction(item) {
                return filter.filterFunction(item, filter.value());
            }
        });
        return filtered ? filtered : source;
    };
})();
//@ sourceURL=/Common/Panes/grid

(function () {
    var utils = TC.Utils;

    TC.tooltipTimeout = 5000;

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
                TC.createNode(element, { path: '/Common/tooltip', data: data }, utils.extractNode(bindingContext));
            }

        }
    };

    TC.renderTooltips = function (tooltips, topic, parentPane, show) {
        if (!Configuration.mobile()) {
            if (_.isArray(tooltips))
                for (var i = 0; i < tooltips.length; i++)
                    renderTooltip(tooltips[i], true);
            else
                for (var property in tooltips)
                    if (tooltips.hasOwnProperty(property)) {
                        renderTooltip(tooltips[property], show !== false && Store(tipShownKey(property)) !== true);
                        if (show !== false)
                            Store(tipShownKey(property), true);
                    }

            function renderTooltip(tooltip, autoShow) {
                var target = $(parentPane.element).find(tooltip.selector);
                if (target.length > 0) {
                    if (parentPane.element)
                        TC.insertNodeAfter(target, { path: '/Common/tooltip', data: extend(tooltip, autoShow) });
                } else {
                    TC.logger.warn("Tooltip for selector " + tooltip.selector + " not rendered - element not found");
                }
            }

            function extend(tooltip, autoShow) {
                return $.extend({ timeout: TC.tooltipTimeout, topic: topic, autoShow: autoShow && !tooltip.hover, target: $(parentPane.element).find(tooltip.selector) }, tooltip);
            }

            function tipShownKey(property) {
                return "tooltip.shown: " + parentPane.path + '.' + property;
            }
        }
    };

})();
//@ sourceURL=/Common/Infrastructure/tooltipBindingHandler

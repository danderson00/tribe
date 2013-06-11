TC.scriptEnvironment = { resourcePath: '/Common/tooltip' };
TC.registerModel(function(pane) {

});
//@ sourceURL=/Common/Panes/tooltip
TC.scriptEnvironment = { resourcePath: '/Common/contentHeader' };
(function () {
    TC.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;

        this.gradientClass = data.gradientClass ? data.gradientClass : 'gradientGreen';
        this.text = data.text;
        this.buttons = $.map(data.buttons || [], function (button) {
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
            if ($.isArray(source))
                return data.modifier ? applyModifier(source, data.modifier) : source;

            if (filter && filter.length > 0)
                source = filterProperties(source, filter);

            return _.map(source, function (item, key) {
                return { data: data.modifier ? applyModifier(item, data.modifier) : item, label: key };
            });
        }

        function extractPlayers(source) {
            if ($.isArray(source))
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
TC = window.TC || {};
TC.grid = TC.grid || {};

(function () {
    TC.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;
        var self = this;

        var grid = TC.grid;
        var source = ko.utils.unwrapObservable(data.source);
        var id = TC.Utils.getUniqueId();
        var columnList = extractColumnList();
        var lastSort;

        this.showHeader = data.showHeader !== false;
        this.columnList = columnList;
        this.groupings = ko.observableArray(extractGroupingList());
        this.headings = ko.observableArray(generateHeadings());
        this.filters = $.map(data.filters, function (filter) {
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
                rows = $.map(rows, generateRow);
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
                row = $.map(columnList, function (column) { return generateCell(item, column); });
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
                return $.map(columnList, function (column) { return column.heading; });
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
        $.each(filters, function (index, filter) {
            var value = filter.value();
            if (filter.filterFunction && value !== null && value !== undefined)
                filtered = $.filter(filtered ? filtered : source, executeFilterFunction);

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
            if ($.isArray(tooltips))
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

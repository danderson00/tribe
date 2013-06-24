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
        this.buttons = T.map(data.buttons || [], function (button) {
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

        this.id = data.id ? data.id : T.getUniqueId();
        
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
//@ sourceURL=/Common/Panes/grid
TC.scriptEnvironment = { resourcePath: '/Common/tabs' };
TC.registerModel(function (pane) {
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
//@ sourceURL=/Common/Panes/tabs

ko.bindingHandlers.colspan = {
    update: function (element, valueAccessor) {
        $(element).attr('colspan', valueAccessor());
    }
};
//@ sourceURL=/Common/Infrastructure/colspanBindingHandler

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

//@ sourceURL=/Common/Infrastructure/elements

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
//@ sourceURL=/Common/Infrastructure/sortBy

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
    };

})();
//@ sourceURL=/Common/Infrastructure/tooltipBindingHandler
$('head').append('<script type="text/template" id="template--Common-contentHeader"><div class="contentHeader roundedTop gradient" data-bind="cssClass: gradientClass">\n    <ul>\n        <li class="heading"><span data-bind="text: text"></span></li>\n        <div data-bind="foreach: buttons">\n            <li class="right button" data-bind="click: click, visible: visible"><a data-bind="text: text"></a></li>\n        </div>\n    </ul>\n</div>\n</script>\n<script type="text/template" id="template--Common-dropDown"><div class="dropDownTrigger roundedSmall borderDark" data-bind="visible: showTrigger">\n    <span data-bind="text: selectedText"></span>\n    <div class="dropDownIcon smallArrowDown"></div>\n</div>\n\n<div class="dropDownPanel rounded subpanel">\n    <!-- ko if: allowCreate -->\n        <div><span>Create new:</span></div>\n        <div class="dropDownNewItem"><input type="text" /></div>\n    <!-- /ko -->\n        \n    <!-- ko if: items() && items().length > 0 -->\n        <div style="clear: left"><span>Select:</span></div>\n        <div style="clear: left" data-bind="foreach: items">\n            <div class="listItem" data-bind="click: $parent.selectItem, css: { selected: $parent.isItemSelected($data) }">\n                <span style="white-space: nowrap" data-bind="html: $parent.displayText($data)"></span>\n                <div style="float: right" />\n            </div>\n        </div>\n    <!-- /ko -->\n</div>\n</script>\n<script type="text/template" id="template--Common-expander"><div class="expander rounded borderLight" data-bind="css: { expanded: expanded }">\n    <div class="expanderHeader gradientGreen roundedTop roundedBottom" data-bind="click: click">        \n        <div class="arrow smallArrowDown"></div>\n        <div class="icon" />\n        <span class="headerText" data-bind="text: headerText"></span>\n        <!--<div class="iconPrint" data-bind="click: print"></div>-->\n    </div>\n    <div class="expanderContent roundedBottom">\n    </div>\n</div></script>\n<script type="text/template" id="template--Common-expanderList"><div class="expanderList" data-bind="foreach: expanders">\n    <div class="expanderContainer" data-bind="pane: \'/Common/expander\', data: $data"></div>\n</div></script>\n<script type="text/template" id="template--Common-graph"><div class="graphSeriesSelect" data-bind="visible: showSeriesSelect, displayText: seriesSelectText, selectField: selectedSeries, items: availableSeries, multipleSelect: true"></div>\n<div class="graphContainer" style="overflow: hidden; clear: left">\n    <div class="graph" style="float: left"></div>\n    <div class="legend" style="float: left"></div>\n</div></script>\n<script type="text/template" id="template--Common-grid"><!-- ko if: filters -->\n<div data-bind="foreach: filters" class="grid-filters">\n    <div data-bind="field: $data" class="grid-filter"></div>\n</div>\n<!-- /ko -->\n<div style="clear: left"></div>\n<div class="gridContainer">\n    <table class="grid" data-bind="if: $data.rows().length > 0">\n        <thead data-bind="visible: showHeader">\n            <!-- ko if: groupings().length > 0 -->\n            <tr class="grid-grouping" data-bind="foreach: groupings">\n                <!-- ko if: grouping == \'\' -->\n                <th data-bind="colspan: columnCount"></th>\n                <!-- /ko -->\n                <!-- ko if: grouping != \'\' -->\n                <th class="grid-grouping-item" data-bind="html: grouping, colspan: columnCount"></th>\n                <!-- /ko -->\n            </tr>\n            <!-- /ko -->\n\n            <tr class="grid-column-list grid-header" data-bind="foreach: headings">\n                <th class="grid-header-item" data-bind="html: $data, click: function (data, event) { $parent.sort($(event.currentTarget).index()); }"></th> \n            </tr>\n        </thead>\n\n        <tbody data-bind="foreach: rows">\n            <tr class="grid-column-list grid-row" data-bind="foreach: $data, click: function () { $parent.rowClick($data); }">\n                <td class="grid-row-item" data-bind="cssClass: cssClass">\n                    <span data-bind="html: $data.display"></span>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div></script>\n<script type="text/template" id="template--Common-tabs"><div class="tabs">\n    <div class="tabList" data-bind="foreach: tabs">\n        <div class="tab gradientGreen" data-bind="text: header, click: $root.select, css: { active: active }"></div>\n    </div>\n    <div class="tabContent" data-bind="html: content"></div>\n</div></script>\n');
$('<style/>')
    .attr('class', '__tribe')
    .text('.contentHeader{overflow:hidden;font-size:13px;margin-bottom:5px}.contentHeader ul{margin:0;padding:0;list-style-type:none;-webkit-border-top-right-radius:6px;-moz-border-radius-topright:6px;border-top-right-radius:6px;-webkit-border-top-left-radius:6px;-moz-border-radius-topleft:6px;border-top-left-radius:6px}.contentHeader ul li{float:left;display:block;padding:10px 15px}.contentHeader ul li.heading{padding-top:7px;font-size:1.2em;font-weight:bold}.desktop .contentHeader ul li.heading{text-shadow:0 1px 0 white}.contentHeader ul li.right{float:right}.contentHeader ul li.button{cursor:pointer}.contentHeader ul li.right.button{border-left:1px solid #ccc}.contentHeader ul li a{text-decoration:underline;color:#111}.contentHeader ul li a:hover{text-decoration:underline;color:blue}.dropDownTrigger{position:relative;font-family:Arial;font-size:13px;margin:0;padding-top:2px;padding-left:3px;height:18px;width:150px;overflow:hidden;cursor:pointer}.dropDownTrigger span{white-space:nowrap}.dropDownIcon{position:absolute;right:0;top:2px;background-color:#fff;margin-top:6px;margin-right:6px}.dropDownPanel{position:absolute;padding:3px;overflow:auto;display:none;z-index:1}.dropDownPanel input{margin:5px 3px}.dropDownNewItem{float:left}.listItem{width:auto;background-color:#ccc;margin-bottom:5px;height:31px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;cursor:pointer;overflow:hidden}.listItem span{display:block;overflow:hidden;padding:5px 10px;color:#000}.listItem input{width:auto;font-family:\'Segoe UI\',"Trebuchet MS",Arial,Helvetica,Verdana,sans-serif;height:29px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;border:1px solid #999;padding:0 0 0 5px;font-size:inherit;outline:none}.listItem:hover{background-color:#a9a9a9;color:#fff}.listItem.selected{background-color:#bce}.expander{position:relative}.expanderHeader{height:25px;padding:5px;cursor:pointer;-webkit-transform:translateZ(0);-webkit-backface-visibility:hidden;-webkit-perspective:1000}.expanderContent{padding:0 10px 10px 10px;display:none;background:#fff;-webkit-transform:translateZ(0);-webkit-backface-visibility:hidden;-webkit-perspective:1000}.expanderHeader .headerText{margin-left:6px}.expanderHeader .arrow{float:left;width:0;height:0;margin-left:5px;margin-right:5px}.expanderHeader .icon{float:left;margin-top:4px;margin-left:4px;width:16px;height:16px}.expanderHeader .iconGraph{background-image:url(images/icon.graph.png)}.expanderHeader .iconGrid{background-image:url(images/icon.grid.png)}.expanderHeader .iconList{background-image:url(images/icon.list.png)}.expanderHeader .smallArrowDown{margin-top:10px;margin-left:6px}.expanderHeader .smallArrowUp{margin-top:5px;margin-left:6px}.expander .iconPrint{display:none;float:right;margin-top:4px;margin-right:4px}.expander.expanded .iconPrint{display:block}.expanderList{padding:10px}.expanderContainer:nth-child(n+2) .expander{margin-top:10px}.graphContainer{margin-top:5px}.graph{width:800px;height:450px}.embedded .graph{width:500px;height:350px}.main .graph{width:272px;height:100px}.desktop .gridContainer{overflow:auto}.mobile .gridContainer{overflow:hidden}.grid{font-size:.85em;clear:left}.grid-filter{float:left;padding-right:20px}.grid-filter .label{width:auto;margin-right:10px}.grid-grouping{}.grid-grouping-item{font-weight:bold;background-color:#ddd;text-align:center}.grid-header{}.grid-header-item{font-weight:bold;background-color:#ddd;cursor:pointer}.grid-header-item:hover{background-color:#bbb;color:#000}.grid-row{cursor:pointer}.grid-row:hover .grid-row-item{background-color:#ccc;color:#000}.grid-row-item{background-color:#eee;text-align:right;background-repeat:no-repeat;background-position:center}.grid-row-selected .grid-row-item{background-color:#333;color:#fff}.grid-row-item.icon{font-size:0}.tabList .tab{float:left;padding:10px 20px;border:1px solid grey;border-top-left-radius:6px;border-top-right-radius:6px;margin:0 5px -1px 5px}.tabList .tab.active{background:#fff;border-bottom:1px solid #fff}.tabContent{clear:both;padding:10px;border:1px solid grey}.smallArrowUp{border:4px solid transparent;border-bottom-color:#999;height:0;width:0}.smallArrowDown{border:4px solid transparent;border-top-color:#999;height:0;width:0}.smallArrowLeft{border:4px solid transparent;border-right-color:#999;height:0;width:0}.smallArrowRight{border:4px solid transparent;border-left-color:#999;height:0;width:0}.arrowUp{border:6px solid transparent;border-bottom-color:#000;height:0;width:0}.arrowDown{border:6px solid transparent;border-top-color:#000;height:0;width:0}.arrowLeft{border:6px solid transparent;border-right-color:#000;height:0;width:0}.arrowRight{border:6px solid transparent;border-left-color:#000;height:0;width:0}button{-moz-box-shadow:inset 0 1px 0 0 #fff;-webkit-box-shadow:inset 0 1px 0 0 #fff;box-shadow:inset 0 1px 0 0 #fff;background:-webkit-gradient(linear,left top,left bottom,color-stop(.05,#ededed),color-stop(1,#dfdfdf));background:-moz-linear-gradient(center top,#ededed 5%,#dfdfdf 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ededed\',endColorstr=\'#dfdfdf\');background-color:#ededed;-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;border:1px solid #dcdcdc;display:inline-block;color:#777;font-size:15px;font-weight:bold;font-family:\'Segoe UI\',Arial,"Trebuchet MS",Helvetica,Verdana,sans-serif;padding:6px 24px;margin:2px;text-decoration:none;text-shadow:1px 1px 0 #fff;vertical-align:top}button:hover{background:-webkit-gradient(linear,left top,left bottom,color-stop(.05,#dfdfdf),color-stop(1,#ededed));background:-moz-linear-gradient(center top,#dfdfdf 5%,#ededed 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#dfdfdf\',endColorstr=\'#ededed\');background-color:#dfdfdf}button:active{-moz-box-shadow:inset 1px 1px 0 0 #ededed;-webkit-box-shadow:inset 1px 1px 0 0 #ededed;box-shadow:inset 1px 1px 0 0 #ededed;padding:7px 23px 5px 25px}button::-moz-focus-inner,input[type="reset"]::-moz-focus-inner,input[type="button"]::-moz-focus-inner,input[type="submit"]::-moz-focus-inner,input[type="file"]>input[type="button"]::-moz-focus-inner{padding:0;margin:0;border:0}button:disabled{background:#ededed;padding-top:4px;text-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none;box-shadow:none;color:#999}button:disabled:hover{background:#ededed}button:disabled:active{margin-top:0}button div{display:inline-block;margin-left:15px}.gradientGreen{background:#f0f5e1;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIxJSIgc3RvcC1jb2xvcj0iI2YwZjVlMSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNiNWJhYjIiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(1%,rgba(240,245,225,1)),color-stop(100%,rgba(181,186,178,1)));background:-webkit-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:-o-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:-ms-linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);background:linear-gradient(top,rgba(240,245,225,1) 1%,rgba(181,186,178,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#f0f5e1\',endColorstr=\'#b5bab2\',GradientType=0)}.gradientYellow{background:#ffe4a0;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIxJSIgc3RvcC1jb2xvcj0iI2ZmZTRhMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNhZmFmYWYiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(1%,rgba(255,228,160,1)),color-stop(100%,rgba(175,175,175,1)));background:-webkit-linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);background:-o-linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);background:-ms-linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);background:linear-gradient(top,rgba(255,228,160,1) 1%,rgba(175,175,175,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffe4a0\',endColorstr=\'#afafaf\',GradientType=0)}.gradientBlue{background:#add8e6;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2FkZDhlNiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNhZmFmYWYiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(173,216,230,1)),color-stop(100%,rgba(175,175,175,1)));background:-webkit-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);background:-o-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);background:-ms-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);background:linear-gradient(top,rgba(173,216,230,1) 0%,rgba(175,175,175,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#add8e6\',endColorstr=\'#afafaf\',GradientType=0)}.gradientReverseBlue{background:#add8e6;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2FkZDhlNiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNkN2UyZTUiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(173,216,230,1)),color-stop(100%,rgba(215,226,229,1)));background:-webkit-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);background:-o-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);background:-ms-linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);background:linear-gradient(top,rgba(173,216,230,1) 0%,rgba(215,226,229,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#add8e6\',endColorstr=\'#d7e2e5\',GradientType=0)}.gradientBlack{background:#45484d;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQ1NDg0ZCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background:-moz-linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(69,72,77,1)),color-stop(100%,rgba(0,0,0,1)));background:-webkit-linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);background:-o-linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);background:-ms-linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);background:linear-gradient(top,rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#45484d\',endColorstr=\'#000000\',GradientType=0)}.iconLoading{background-image:url(images/loading16.gif)!important;width:16px;height:16px}.iconCheckboxNo{background-image:url(images/checkbox_no.png)!important;width:16px;height:16px}.iconCheckboxYes{background-image:url(images/checkbox_yes.png)!important;width:16px;height:16px}.iconTick{background-image:url(images/tick_circle.png)!important;width:16px;height:16px}.iconSettings{background-image:url(images/icon.cog.png)!important;width:16px;height:16px}.iconHelp{background-image:url(images/icon.help.png)!important;width:16px;height:16px}.iconPrint{background-image:url(images/icon.print.png)!important;width:16px;height:16px}.iconDownload{background-image:url(images/icon.download.png)!important;width:16px;height:16px}.iconTips{background-image:url(images/icon.tips.png)!important;width:22px;height:22px}')
    .appendTo('head');

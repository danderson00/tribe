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
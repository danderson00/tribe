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
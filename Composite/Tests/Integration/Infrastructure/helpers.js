(function () {
    var helpers = Test.Integration;

    helpers.executeEvents = function (events, pane, data) {
        T.options.events = events;
        T.options.basePath = 'Integration/Panes';

        var $element = $('#qunit-fixture');
        $element.append('<div data-bind="pane: \'' + pane + '\', data: \'' + data + '\'"></div>');
        ko.applyBindings(null, $element.children()[0]);
    };

    helpers.executeDefaultEvents = function (pane) {
        helpers.executeEvents(T.defaultOptions().events, pane);
    };

    helpers.createTestElement = function() {
        $('#qunit-fixture').append('<div class="test"/>');
    };

    helpers.testEventsUntil = function(event) {
        var events = [];
        var defaultEvents = T.defaultOptions().events;
        for (var i = 0, l = defaultEvents.length; i < l; i++) {
            events.push(defaultEvents[i]);
            if (defaultEvents[i] === event)
                break;
        }
        T.Events.spy = sinon.spy();
        events.push('spy');
        return events;
    };

    helpers.teardown = function() {
        $('.__tribe').remove();
    };
})();

$.mockjax({
    url: 'Integration/Panes/Events/async.htm',
    responseText: '<div class="async">\n    <span data-bind="text: message" class="message"></span>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/async.js',
    responseText: 'TC.registerModel(function (pane) {\n    this.message = \'test message\';\n    \n    this.paneRendered = function() {\n        if (Test.state.paneRendered) Test.state.paneRendered();\n    };\n\n    this.renderComplete = function() {\n        if (Test.state.renderComplete) Test.state.renderComplete();\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/asyncParent.htm',
    responseText: '<div data-bind="pane: \'async\'">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/asyncParent.js',
    responseText: 'TC.registerModel(function (pane) {\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/basic.css',
    responseText: '.basic {}',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/basic.htm',
    responseText: '<div class="basic">\n    <span data-bind="text: message" class="message"></span>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/basic.js',
    responseText: 'TC.registerModel(function (pane) {\n    var self = this;\n    \n    Test.state.model = this;\n    Test.state.pane = pane;\n\n    this.message = \'\';\n    this.paneRenderedCalled = false;\n    this.renderCompleteCalled = false;\n    this.disposeCalled = false;\n    \n    this.initialise = function() {\n        self.message = \'test message\';\n    };\n\n    this.paneRendered = function() {\n        self.paneRenderedCalled = true;\n    };\n\n    this.renderComplete = function() {\n        self.renderCompleteCalled = true;\n    };\n\n    this.dispose = function() {\n        self.disposeCalled = true;\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/basicParent.htm',
    responseText: '<div data-bind="pane: \'basic\'" class="basicContainer">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/data.htm',
    responseText: '<div class="data">\n    <span class="message" data-bind="text: message"></span>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/data.js',
    responseText: 'TC.registerModel(function(pane) {\n    this.message = pane.data;\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/dispose.htm',
    responseText: '<div class="dispose">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/dispose.js',
    responseText: 'TC.registerModel(function (pane) {\n    Test.state.disposeCallCount = 0;\n    Test.state.disposed = $.Deferred();\n    \n    this.dispose = function() {\n        Test.state.disposed.resolve();\n        Test.state.disposeCallCount++;\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/initialise.htm',
    responseText: '<div class="initialise"></div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/initialise.js',
    responseText: 'TC.registerModel(function (pane) {\n    this.initialise = function() {\n        return Test.state.deferred = $.Deferred();\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/initialiseParent.htm',
    responseText: '<div data-bind="pane: \'initialise\'">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/initialiseParent.js',
    responseText: 'TC.registerModel(function (pane) {\n    this.renderComplete = function() {\n        Test.state.parentRenderCompleteCalled = true;\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/History/content1.htm',
    responseText: '<div class="content1">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/History/content2.htm',
    responseText: '<div class="content2">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/History/layout.htm',
    responseText: '<div class="layout">\n    <div data-bind="pane: \'content1\', handlesNavigation: true"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/child1.htm',
    responseText: '<div class="child1">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/child2.htm',
    responseText: '<div class="child2">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/content1.htm',
    responseText: '<div class="content1">\n    <div data-bind="pane: \'child1\'"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/content2.htm',
    responseText: '<div class="content2">\n    <div data-bind="pane: \'child2\'"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/layout.htm',
    responseText: '<div class="layout">\n    <div data-bind="pane: \'content1\', handlesNavigation: true"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/common.htm',
    responseText: '<div class="common">\n    <div data-bind="pane: pane"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/common.js',
    responseText: 'TC.registerModel(function(pane) {\n    pane.node.skipPath = true;\n    this.pane = pane.data.pane;\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/Subfolder/child.htm',
    responseText: '<div class="child">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/Subfolder/parent.htm',
    responseText: '<div class="parent">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/Subfolder/parent.js',
    responseText: 'TC.registerModel(function(pane) {\n    this.renderComplete = function() {\n        TC.createNode(\'.parent\', { path: \'/Paths/common\', data: { pane: \'child\' } });\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/PubSub/subscriber.htm',
    responseText: '<div class="subscriber">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/PubSub/subscriber.js',
    responseText: 'TC.registerModel(function(pane) {\n    pane.pubsub.subscribe(\'test\', function(data) {\n        $(\'.subscriber\').text(data);\n    });\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Transition/pane1.htm',
    responseText: '<div class="pane1">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Transition/pane2.htm',
    responseText: '<div class="pane2">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/1.htm',
    responseText: '<div class="1" data-bind="pane: \'11\'">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/1.js',
    responseText: 'TC.registerModel(function (pane) {\n    Test.state.pane = pane;\n\n    this.renderComplete = function() {\n        if (Test.state.renderComplete) Test.state.renderComplete();\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/11.htm',
    responseText: '<div class="11">\n    <div data-bind="pane: \'111\'"></div>\n    <div data-bind="pane: \'112\'"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/111.htm',
    responseText: '<div class="111">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/112.htm',
    responseText: '<div class="112">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/12.htm',
    responseText: '<div class="12">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/child.htm',
    responseText: '<div class="child">\n    <span class="message" data-bind="text: message"></span>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/child.js',
    responseText: 'TC.registerModel(function(pane) {\n    this.message = "test message";\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/dynamicParent.htm',
    responseText: '<div class="dynamicParent">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/dynamicParent.js',
    responseText: 'TC.registerModel(function(pane) {\n    this.paneRendered = function() {\n        TC.createNode(\'.dynamicParent\', { path: \'child\' });\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/parent.htm',
    responseText: '<div class="parent" data-bind="pane: \'child\'">\n\n</div>',
    responseTime: 0
});

$.mockjax({ url: 'Integration/Panes/Events/async.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/asyncParent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/basicParent.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/basicParent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/data.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/dispose.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/initialise.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/initialiseParent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/content1.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/content1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/content2.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/content2.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/layout.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/layout.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/child1.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/child1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/child2.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/child2.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/content1.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/content1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/content2.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/content2.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/layout.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/layout.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Paths/common.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Paths/Subfolder/child.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Paths/Subfolder/child.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Paths/Subfolder/parent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/PubSub/subscriber.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Transition/pane1.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Transition/pane1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Transition/pane2.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Transition/pane2.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/11.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/11.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/111.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/111.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/112.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/112.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/12.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/12.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Utilities/child.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Utilities/dynamicParent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Utilities/parent.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Utilities/parent.css', status: 404, responseTime: 0 });
(function () {
    var moduleFunction = module;
    module = function(name, lifecycle) {
        return moduleFunction('Tribe.Forms.' + name, lifecycle);
    };
    
// Infrastructure/helpers.js
TF.Tests = {
    renderTemplate: function(name, model) {
        var $qunit = $('#qunit-fixture');
        ko.cleanNode($qunit[0]);
        $qunit.append($('#template--' + name).html());
        ko.applyBindings(model, $qunit[0]);
    }
};
// fields.tests.js
(function () {
    var model;
    var list = [
        { value: 1, text: 'One' },
        { value: 2, text: 'Two' },
        { value: 3, text: 'Three' }
    ];

    module('fields', {
        setup: function () {
            model = createModel();
            TF.Tests.renderTemplate('fields', model);
        }
    });

    test("Labels are rendered correctly", function () {
        expect(8);
        $.each($('.label span'), function () {
            equal($(this).text(), 'label');
        });
    });

    test("Existing values are rendered correctly", function () {
        equal(getDisplay(0, 'span').html(), 'value');
        equal(getDisplay(1, 'input').val(), 'text');
        equal(getDisplay(2, 'input').val(), '01/01/2001');
        equal(getDisplay(3, 'input').val(), 'password');
        equal(getDisplay(4, 'select').val(), '2');
        equal(getDisplay(5, 'select option:checked').text(), 'Two');
        equal(getDisplay(6, 'input:checked').val(), '2');
        equal(getDisplay(7, 'input').is(':checked'), true);
    });

    test("Model values are updated", function () {
        getDisplay(1, 'input').val('new').change();
        getDisplay(2, 'input').val('02/02/2002').change();
        getDisplay(3, 'input').val('abc123').change();
        getDisplay(4, 'select').val('3').change();
        getDisplay(5, 'select').prop('selectedIndex', 2).change();
        getDisplay(6, 'input:eq(2)').click().click(); // not sure, but it works...
        getDisplay(7, 'input').click();

        equal(model.text(), 'new');
        equal(model.date(), '02/02/2002');
        equal(model.password(), 'abc123');
        equal(model.simpleSelect(), '3');
        equal(model.objectSelect(), list[2]);
        equal(model.radio(), '3');
        equal(model.boolean(), false);
    });

    test("Displayed values are updated", function () {
        model.display('new');
        model.text('new');
        model.date('02/02/2002');
        model.password('abc123');
        model.simpleSelect('3');
        model.objectSelect(list[2]);
        model.radio('3');
        model.boolean(false);

        equal(getDisplay(0, 'span').html(), 'new');
        equal(getDisplay(1, 'input').val(), 'new');
        equal(getDisplay(2, 'input').val(), '02/02/2002');
        equal(getDisplay(3, 'input').val(), 'abc123');
        equal(getDisplay(4, 'select').val(), '3');
        equal(getDisplay(5, 'select option:checked').text(), 'Three');
        equal(getDisplay(6, 'input:checked').val(), '3');
        equal(getDisplay(7, 'input').is(':checked'), false);
    });

    function getDisplay(index, tag) {
        return $('#qunit-fixture .field:eq(' + index + ') .display ' + tag);
    }

    function createModel() {
        return {
            display: ko.observable('value'),
            text: ko.observable('text'),
            date: ko.observable('01/01/2001'),
            password: ko.observable('password'),
            simpleSelect: ko.observable('2'),
            objectSelect: ko.observable(list[1]),
            radio: ko.observable('2'),
            boolean: ko.observable(true),
            list: list
        };
    };
})();

// forms.tests.js
(function () {
    var model;
    
    module('forms', {
        setup: function () {
            model = {
                data: { text: ko.observable('test') }
            };
            TF.Tests.renderTemplate('forms', model);
        }
    });

    test("Existing field renders", function () {
        equal($('.existing input').val(), 'test');
    });
    
    test("properties are created on existing objects in create mode", function() {
        equal(model.data.text2(), 'test');
    });

    test("objects are created on existing objects in create mode", function() {
        equal(model.data.created.text3(), 'test');
    });
    
    test("new objects are created", function () {
        expect(2);
        $('#testButton').click();
        window.testCreatedObject = undefined;
    });

    window.testCreatedObject = function (model) {
        equal(model.text4(), 'test');
        equal(model.text5.text6(), 'test');
    };

})();

// Utils.tests.js
(function () {
    module('Utils');

    var utils = TF.Utils;

    test("evaluateProperty", function () {
        var target = {
            test1: {
                test11: 'test',
                test12: {
                    test121: 'test'
                }
            },
            test2: 'test'
        };

        equal(utils.evaluateProperty(target, 'test3'), undefined);
        equal(utils.evaluateProperty(target, 'test3.test4'), undefined);
        equal(utils.evaluateProperty(target, 'test1.test4'), undefined);
        equal(utils.evaluateProperty(target, ''), target);
        equal(utils.evaluateProperty(target, 'test1'), target.test1);
        equal(utils.evaluateProperty(target, 'test2'), 'test');
        equal(utils.evaluateProperty(target, 'test1.test11'), 'test');
        equal(utils.evaluateProperty(target, 'test1.test12.test121'), 'test');
        equal(utils.evaluateProperty(target, '.test1'), target.test1);
        equal(utils.evaluateProperty(target, 'test1.'), target.test1);
        equal(utils.evaluateProperty(target, 'test1..test11'), 'test');

        var container = {};
        equal(utils.evaluateProperty(target, 'test3', container), container);
        equal(target.test3, container);
        utils.evaluateProperty(target, 'test3.test4', 'test');
        equal(target.test3.test4, 'test');

        utils.evaluateProperty(target, 'test4.test5.test6', 'test');
        equal(target.test4.test5.test6, 'test');
    });
})();

//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('<div data-bind="display: display, displayText: \'label\'"></div>\n<div data-bind="textField: text, displayText: \'label\'"></div>\n<div data-bind="dateField: date, displayText: \'label\'"></div>\n<div data-bind="passwordField: password, displayText: \'label\'"></div>\n<div data-bind="selectField: simpleSelect, displayText: \'label\', items: [\'1\', \'2\', \'3\']"></div>\n<div data-bind="selectField: objectSelect, displayText: \'label\', items: list, optionsText: \'text\'"></div>\n<div data-bind="radioField: radio, displayText: \'label\', items: [\'1\', \'2\', \'3\']"></div>\n<div data-bind="booleanField: boolean, displayText: \'label\'"></div>\n', 'template--fields');//
window.__appendTemplate('<div class="existing" data-bind="form: data">\n    <div data-bind="textField: text"></div>\n</div>\n\n<div class="createProperties" data-bind="form: data, create: true">\n    <div data-bind="textField: \'text2\', defaultValue: \'test\'"></div>    \n</div>\n\n<div class="createObject" data-bind="form: \'data.created\', create: true">\n    <div data-bind="textField: \'text3\', defaultValue: \'test\'"></div>        \n</div>\n\n<div class="newObject" data-bind="form: {}, create: true">\n    <div data-bind="textField: \'text4\', defaultValue: \'test\'"></div>\n    <div data-bind="textField: \'text5.text6\', defaultValue: \'test\'"></div>\n    <button id="testButton" data-bind="click: testCreatedObject"></button>\n</div>', 'template--forms');
        
    module = moduleFunction;
})();(function () {
    var moduleFunction = module;
    module = function(name, lifecycle) {
        return moduleFunction('Tribe.Composite.' + name, lifecycle);
    };
    
Test = {
    Unit: {},
    Integration: {},
    state: {}
};

Test.defaultOptions = function() {
    return {
        synchronous: true,
        handleExceptions: false,
        basePath: 'Integration/Panes/',
        loadStrategy: 'adhoc',
        events: TC.defaultOptions().events,
        defaultUrlProvider: TC.options.defaultUrlProvider
    };
};
TC.options = Test.defaultOptions();


QUnit.testDone(function () {
    ko.cleanNode(document.getElementById('qunit-fixture'));
    Test.state = {};
    TC.options = Test.defaultOptions();
});

TC.history.dispose();// Integration/Infrastructure/context.js
TC.context = function (state) {
    Test.Integration.context = $.extend({
        models: new TC.Types.Models(),
        loader: new TC.Types.Loader(),
        options: TC.options,
        templates: new TC.Types.Templates(),
        loadedPanes: {},
        renderOperation: new TC.Types.Operation(),
        pubsub: Test.Integration.pubsub()
    }, state);
    return Test.Integration.context;
};
// Integration/Infrastructure/helpers.js
(function () {
    var helpers = Test.Integration;

    helpers.executeEvents = function (events, pane, data) {
        TC.options.events = events;
        TC.options.basePath = 'Integration/Panes';

        var $element = $('#qunit-fixture');
        $element.append('<div data-bind="pane: \'' + pane + '\', data: \'' + data + '\'"></div>');
        ko.applyBindings(null, $element.children()[0]);
    };

    helpers.executeDefaultEvents = function (pane) {
        helpers.executeEvents(TC.defaultOptions().events, pane);
    };

    helpers.createTestElement = function() {
        $('#qunit-fixture').append('<div class="test"/>');
    };

    helpers.testEventsUntil = function(event) {
        var events = [];
        var defaultEvents = TC.defaultOptions().events;
        for (var i = 0, l = defaultEvents.length; i < l; i++) {
            events.push(defaultEvents[i]);
            if (defaultEvents[i] === event)
                break;
        }
        TC.Events.spy = sinon.spy();
        events.push('spy');
        return events;
    };

    helpers.teardown = function() {
        $('.__tribe').remove();
    };
})();

// Integration/Infrastructure/pubsub.js
Test.Integration.pubsubAsMock = function() {
    Test.Integration.pubsub = function() {
        var pubsub = { end: sinon.spy(), createLifetime: function () { return pubsub; } };
        sinon.spy(pubsub, 'createLifetime');
        return pubsub;
    };
};

Test.Integration.pubsubAsTribe = function () {
    Test.Integration.pubsub = function () {
        return new Tribe.PubSub({ sync: true });
    };
};

Test.Integration.pubsubAsMock();
// Integration/Infrastructure/supportsTransitions.js
Test.supportsTransitions = (function() {
    var b = document.body || document.documentElement;
    var style = b.style;
    var property = 'transition';
    var vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

    if (typeof style[property] == 'string') { return true; }

    // Tests for vendor specific prop
    property = property.charAt(0).toUpperCase() + property.substr(1);
    for (var i = 0, l = vendors.length; i < l; i++) {
        if (typeof style[vendors[i] + property] == 'string') { return true; }
    }

    return false;
})();

// Unit/Infrastructure/context.js
Test.Unit.context = function () {
    var template = '';
    var context = {
        loader: {
            get: sinon.spy()
        },
        models: {
            test: { constructor: sinon.spy() }
        },
        options: {
            synchronous: true,
            basePath: '',
            events: ['test']
        },
        templates: {
            template: '',
            store: sinon.spy(),
            loaded: sinon.spy(),
            render: function() {
                $('#qunit-fixture').append(template);
            }
        },
        setTemplate: function(value) {
            template = value;
        },
        loadedPanes: {},
        rootNode: null,
        renderOperation: {
            promise: $.Deferred(),
            complete: function () { }
        }
    };
    sinon.spy(context.templates, 'render');
    return context;
};
// Unit/Infrastructure/events.js
Test.raiseDocumentEvent = function(name, eventData, state) {
    var e;
    if (document.createEvent) {
        e = document.createEvent("Event");
        e.initEvent(name, true, false);
    } else {
        e = document.createEventObject();
        e.eventType = name;
    }

    e.eventName = name;
    e.eventData = eventData;
    e.state = state;

    if (document.createEvent)
        document.dispatchEvent(e);
    else
        document.fireEvent("on" + e.eventType, e);
};
// Unit/Infrastructure/featureDetection.js
Test.supportsMutationEvents = ("MutationEvent" in window);
Test.supportsHistory = ("onpopstate" in window);

// Unit/Infrastructure/node.js
Test.Unit.node = function () {
    var pane = Test.pane();
    return {
        pane: pane,
        path: pane.path,
        children: [],
        nodeForPath: function() { return this; }
    };
};
// Unit/Infrastructure/pane.js
Test.pane = function () {
    return {
        path: 'test',
        element: '#qunit-fixture',
        model: {
            initialise: sinon.spy(),
            paneRendered: sinon.spy()
        },
        startRender: function () { },
        endRender: function () { },
        dispose: function () { }
    };
};
// Unit/Utilities/bindingHandlers.tests.js
(function() {
    module('Unit.Utilities.bindingHandlers');

    test("enterPressed executes callback when enter keyup event occurs in specified element, passing element value", function () {
        var element = $('<input/>').appendTo('#qunit-fixture');
        var spy = sinon.spy();
        ko.bindingHandlers.enterPressed.init(element[0], function () { return spy; });
    
        ok(spy.notCalled);
        element.val('value');
        element.trigger(keyEvent('keyup', 13));
        ok(spy.calledOnce);
        ok(spy.calledWithExactly('value'));
    });
    
    function keyEvent(eventName, which) {
        var event = jQuery.Event(eventName);
        event.which = which;
        return event;
    }
})();

// Unit/Utilities/collections.tests.js
module('Unit.Utilities.collections');

test("each executes iterator for each item of array, passing value and index", function () {
    var spy = sinon.spy();
    T.each(['1', '2'], spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 0);
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 1);
});

test("each executes iterator for each property of object, passing value and property name", function () {
    var spy = sinon.spy();
    T.each({ test1: '1', test2: '2' }, spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 'test1');
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 'test2');
});

test("map executes iterator for each item of array, passing value and index", function () {
    var spy = sinon.spy();
    T.map(['1', '2'], spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 0);
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 1);
});

test("map executes iterator for each property of object, passing value and property name", function () {
    var spy = sinon.spy();
    T.map({ test1: '1', test2: '2' }, spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 'test1');
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 'test2');
});

test("map does not flatten arrays", function() {
    var result = T.map([1, 2], function () { return [3, 4]; });
    equal(result.length, 2);
    deepEqual(result[0], [3, 4]);
    deepEqual(result[1], [3, 4]);
});

test("map returns empty array for undefined input", function() {
    var spy = sinon.spy();
    deepEqual(T.map(undefined, spy), []);
    ok(spy.notCalled);
});

test("filter executes once for each item of array", function() {
    var spy = sinon.spy();
    T.filter(['1', '2'], spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 0);
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 1);
});

test("filter executes once for each property of object", function () {
    var spy = sinon.spy();
    T.filter({ test1: '1', test2: '2' }, spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 'test1');
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 'test2');
});

test("filter returns array of values filtered by iterator function", function() {
    var result = T.filter(['1', '2'], function (item) { return item !== '1'; });
    equal(result.length, 1);
    equal(result[0], '2');
});

test("filter returns empty array for undefined input", function () {
    var spy = sinon.spy();
    deepEqual(T.filter(undefined, spy), []);
    ok(spy.notCalled);
});

test("pluck returns property value from each object in array", function() {
    var result = T.pluck([
        { one: 'a', two: 'b' },
        { one: 'c', two: 'd' },
        { one: 'e', two: 'f' }
    ], 'one');
    equal(result.length, 3);
    equal(result.join(''), 'ace');
});

test("reduce executes reduceFunction with expected arguments", function() {
    var spy = sinon.spy();
    var list = [1, 2];
    T.reduce(list, 'initial', spy);

    equal(spy.callCount, 2);
    deepEqual(spy.firstCall.args, ['initial', 1, 0, list]);
    deepEqual(spy.secondCall.args, [undefined, 2, 1, list]);
});

test("reduce returns expected result", function() {
    var result = T.reduce([1, 2, 3, 4], 10, function(memo, value) {
        return memo + value;
    });
    equal(result, 20);
});
// Unit/Utilities/elementDestroyed.tests.js
module('Unit.Utilities.elementDestroyed');

test("promise resolves when element is removed using jQuery", function () {
    expect(1);
    var element = $('<div/>').appendTo('#qunit-fixture');
    $.when(TC.Utils.elementDestroyed(element)).done(function() {
        ok(true);
    });
    element.remove();
});

asyncTest("promise resolves when element is removed using native functions", function () {
    if (Test.supportsMutationEvents) {
        expect(1);
        var element = $('<div/>').appendTo('#qunit-fixture');
        $.when(TC.Utils.elementDestroyed(element)).done(function() {
            ok(true);
            start();
        });
        element[0].parentNode.removeChild(element[0]);
    } else {
        // this should really be a warning
        ok(true, "Browser does not support DOM mutation events. Only elements removed with jQuery will be properly cleaned in this browser.");
        start();
    }
});

// Unit/Utilities/events.tests.js
(function() {
    var utils = TC.Utils;
    var spy;

    module('Unit.Utilities.events', {
        setup: function () { spy = sinon.spy(); }
    });

    test("handleDocumentEvent executes handler when event is fired using raiseDocumentEvent", function () {
        utils.handleDocumentEvent('click', spy);
        utils.raiseDocumentEvent('click');
        ok(spy.calledOnce);
        utils.detachDocumentEvent('click', spy);
    });

    test("handleDocumentEvent executes handler when event is fired manually", function () {
        utils.handleDocumentEvent('click', spy);
        raise('click');
        ok(spy.calledOnce);
        utils.detachDocumentEvent('click', spy);
    });

    test("detachDocumentEvent removes handler attached with handleDocumentEvent", function () {
        utils.handleDocumentEvent('click', spy);
        utils.raiseDocumentEvent('click');
        utils.detachDocumentEvent('click', spy);
        utils.raiseDocumentEvent('click');
        ok(spy.calledOnce);
    });

    test("raiseDocumentEvent sets eventData property from argument", function() {
        var data = {};
        utils.handleDocumentEvent('click', spy);
        utils.raiseDocumentEvent('click', data);
        equal(spy.firstCall.args[0].eventData, data);
        utils.detachDocumentEvent('click', spy);
    });

    function raise(name) {
        var e;
        if (document.createEvent) {
            e = document.createEvent("Event");
            e.initEvent(name, true, false);
        } else {
            e = document.createEventObject();
            e.eventType = name;
        }

        e.eventName = name;

        if (document.createEvent)
            document.dispatchEvent(e);
        else
            document.fireEvent("on" + e.eventType, e);
    }
})();

// Unit/Utilities/idGenerator.tests.js
(function () {
    module('Unit.Utilities.idGenerator');

    test("idGenerator starts at 0 and generates sequential numbers", function () {
        var generator = TC.Utils.idGenerator();
        equal(generator.next(), 0);
        equal(generator.next(), 1);
        equal(generator.next(), 2);
        equal(generator.next(), 3);
        equal(generator.next(), 4);
    });

    test("getUniqueId is a static generator", function() {
        equal(TC.Utils.getUniqueId(), 0);
        equal(TC.Utils.getUniqueId(), 1);
        equal(TC.Utils.getUniqueId(), 2);
    });
})();

// Unit/Utilities/jquery.complete.tests.js
(function () {
    var deferreds;

    module("Unit.Utilities.jquery.complete", {
        setup: function() { deferreds = [ $.Deferred(), $.Deferred() ]; }
    });

    test("complete resolves when at least one deferred resolves", function () {
        var result = $.complete(deferreds);
        equal(result.state(), 'pending');
        deferreds[0].reject();
        equal(result.state(), 'pending');
        deferreds[1].resolve();
        equal(result.state(), 'resolved');
    });

    test("complete rejects when all passed deferreds reject", function () {
        var result = $.complete(deferreds);
        equal(result.state(), 'pending');
        deferreds[0].reject();
        equal(result.state(), 'pending');
        deferreds[1].reject();
        equal(result.state(), 'rejected');
    });
})();

// Unit/Utilities/nodes.tests.js
(function() {
    module('Unit.Utilities.nodes', {
        setup: function () {
            TC.Events.spy = sinon.spy();
            TC.options.events = ['spy'];
        }
    });

    test("createNode executes events specified in options with new node", function () {
        TC.createNode('#qunit-fixture');
        ok(TC.Events.spy.calledOnce);
        ok(pane());
    });

    test("appendNode appends wrapper to target element", function() {
        TC.appendNode('#qunit-fixture');
        equal($('#qunit-fixture div').length, 1);
    });

    function pane() {
        return TC.Events.spy.firstCall.args[0];
    }
})();

// Unit/Utilities/objects.tests.js
(function() {
    var utils = TC.Utils;
    module('Unit.Utilities.objects');

    test("arguments.byConstructor", function() {
        var argsToPass = ["", {}, function() {
        }, [], 2.2];

        (function() {
            var args = utils.arguments(arguments);
            equal(args.string, argsToPass[0]);
            equal(args.object, argsToPass[1]);
            equal(args.func, argsToPass[2]);
            equal(args.array, argsToPass[3]);
            equal(args.number, argsToPass[4]);

        }).apply(null, argsToPass);
    });

    test("removeItem removes matching item from array", function() {
        var array = [1, 2, 3];
        utils.removeItem(array, 2);
        deepEqual(array, [1, 3]);
    });

    test("removeItem does not affect array if item does not exist", function() {
        var array = [1, 2, 3];
        utils.removeItem(array, 4);
        deepEqual(array, [1, 2, 3]);
    });

    test("inheritOptions", function() {
        var source = { test1: 'test', test2: 2 };
        equal(TC.Utils.inheritOptions(source, {}, ['test1']).test1, 'test');
        equal(TC.Utils.inheritOptions(source, {}, ['test2']).test2, 2);
        equal(TC.Utils.inheritOptions(source, {}, ['test1', 'test2', 'test3']).test3, undefined);
    });
    
    test("cloneData", function () {
        var object = {};
        var result = utils.cloneData({
            func: function () { },
            string: 'string',
            object: object,
            observable: ko.observable('test'),
            except1: 'except1',
            except2: 'except2'
        }, 'except1', 'except2');

        equal(result.func, undefined);
        equal(result.string, 'string');
        equal(result.object, object);
        equal(result.observable, 'test');
        equal(result.except1, undefined);
        equal(result.except2, undefined);
    });
    
    test("normaliseBindings evaluates function passed as value", function () {
        equal(utils.normaliseBindings(value, function () { return {}; }).value, 'test');

        function value() {
            return function () {
                return 'test';
            };
        }
    });
})();
// Unit/Utilities/panes.tests.js
(function () {
    var utils = TC.Utils;
    
    module('Unit.Utilities.panes');

    test("getPaneOptions", function () {
        deepEqual(utils.getPaneOptions('test'), { path: 'test' }, "accepts string value as path");
        deepEqual(utils.getPaneOptions('test', { data: 'data' }), { path: 'test', data: 'data' }, "accepts string value as path and merges other options");
        deepEqual(utils.getPaneOptions({ path: 'test' }), { path: 'test' }, "accepts options object");
        deepEqual(utils.getPaneOptions({ path: 'test' }, { data: 'data' }), { path: 'test', data: 'data' }, "accepts options object and merges other options");
    });
})();

// Unit/Utilities/Path.tests.js
(function () {
    module("Unit.Utilities.Path");

    test('Path handles empty arguments', function () {
        equal(TC.Path('').toString(), '');
        equal(TC.Path(undefined).toString(), '');
        equal(TC.Path(null).toString(), '');
    });

    test("withoutFilename", function () {
        equal(TC.Path("/folder/subfolder/filename.ext").withoutFilename().toString(), "/folder/subfolder/", "Path with slashes");
    });

    test("filename", function () {
        equal(TC.Path("filename.ext").filename().toString(), "filename.ext", "Filename");
        equal(TC.Path("/filename.ext").filename().toString(), "filename.ext", "Root path filename");
        equal(TC.Path("/folder/subfolder/filename.ext").filename().toString(), "filename.ext", "Path with slashes");
    });

    test("extension", function () {
        equal(TC.Path("filename.ext").extension().toString(), "ext", "Filename");
        equal(TC.Path("/filename.ext").extension().toString(), "ext", "Root path filename");
        equal(TC.Path("filename").extension().toString(), "", "Filename without extension");
        equal(TC.Path("/filename").extension().toString(), "", "Root path filename without extension");
        equal(TC.Path("filename.").extension().toString(), "", "Empty extension");
        equal(TC.Path("/folder/subfolder/filename.ext").extension().toString(), "ext", "Path with slashes");
    });

    test("withoutExtension", function () {
        equal(TC.Path("filename.ext").withoutExtension().toString(), "filename");
        equal(TC.Path("filename").withoutExtension().toString(), "filename");
        equal(TC.Path("/test/filename.ext").withoutExtension().toString(), "/test/filename");
        equal(TC.Path("/test/filename").withoutExtension().toString(), "/test/filename");
        equal(TC.Path("/test/filename.ext").filename().withoutExtension().toString(), "filename");
        equal(TC.Path("/test/filename").filename().withoutExtension().toString(), "filename");
    });

    test("Path objects can be concatenated with strings", function () {
        equal(TC.Path('/folder/filename.ext').withoutFilename() + 'new.ext', '/folder/new.ext');
    });

    test("isAbsolute", function () {
        ok(TC.Path("/test/").isAbsolute());
        ok(TC.Path("http://test/").isAbsolute());
        ok(!TC.Path("test/").isAbsolute());
        ok(!TC.Path("test.txt").isAbsolute());
        ok(!TC.Path("../test.txt").isAbsolute());
    });

    test("makeAbsolute", function () {
        equal(TC.Path("/test").makeAbsolute().toString(), "/test");
        equal(TC.Path("test").makeAbsolute().toString(), "/test");
        equal(TC.Path("test.txt").makeAbsolute().toString(), "/test.txt");
        equal(TC.Path("test/test.txt").makeAbsolute().toString(), "/test/test.txt");
    });

    test("makeRelative", function () {
        equal(TC.Path("test").makeRelative().toString(), "test");
        equal(TC.Path("/test").makeRelative().toString(), "test");
        equal(TC.Path("/test.txt").makeRelative().toString(), "test.txt");
        equal(TC.Path("/test/test.txt").makeRelative().toString(), "test/test.txt");
    });

    test("normalise", function () {
        equal(TC.Path('test').toString(), 'test');
        equal(TC.Path('../test').toString(), '../test');
        equal(TC.Path('test1/../test2').toString(), 'test2');
        equal(TC.Path('/test1/../test2').toString(), '/test2');
        equal(TC.Path('/test1/../test2/../test3').toString(), '/test3');
        equal(TC.Path('./test').toString(), 'test');
        equal(TC.Path('test1/./test2').toString(), 'test1/test2');
        equal(TC.Path('.././test1/../test2').toString(), '../test2');
        equal(TC.Path('http://test//test.htm').toString(), 'http://test/test.htm');
        equal(TC.Path('http://test///test//test.htm').toString(), 'http://test/test/test.htm');
        equal(TC.Path('1///2//3/4/5').toString(), '1/2/3/4/5');
    });

    test("asPathIdentifier", function () {
        equal(TC.Path('test.txt').asMarkupIdentifier().toString(), 'test');
        equal(TC.Path('test/test.txt').asMarkupIdentifier().toString(), 'test-test');
    });

    test("setExtension", function() {
        equal(TC.Path('/test/test').setExtension('js').toString(), '/test/test.js');
        equal(TC.Path('/test/test.txt').setExtension('js').toString(), '/test/test.js');
    });

    test("combine", function() {
        equal(TC.Path('/test/').combine('/test.txt').toString(), '/test/test.txt');
        equal(TC.Path('http://test/').combine('/test.txt').toString(), 'http://test/test.txt');
        equal(TC.Path('/1/').combine('/2/').combine('/test.txt').toString(), '/1/2/test.txt');
        equal(TC.Path('').combine('test.txt').toString(), 'test.txt');
    });
})();

// Unit/Utilities/querystring.tests.js
(function () {
    module('Unit.Utilities.querystring');
    
    var querystring = TC.Utils.Querystring;

    test("stringify handles flat objects", function() {
        equal(querystring.stringify({ test: 't', test2: 2 }), 'test=t&test2=2');
    });
    
    test("stringify handles nested objects", function () {
        equal(decodeURI(querystring.stringify({ test: { test2: 't' } })), 'test[test2]=t');
        equal(decodeURI(querystring.stringify({ test: { test2: { test3: 't' } } })), 'test[test2][test3]=t');
    });

    test("stringify handles arrays", function () {
        equal(decodeURI(querystring.stringify({ test: { test2: [{ test3: 't' }] } })), 'test[test2][][test3]=t');
    });

    test("stringify handles arrays with arrayKey set to false", function () {
        equal(
            decodeURI(querystring.stringify({ test: { test2: [{ test3: 't' }] } }, { arrayKey: false })),
            'test[test2][test3]=t');
    });

    test("stringify raises if source contains cyclic references", function () {
        raises(function () {
            var test1 = {};
            var test2 = { test1: test1 };
            test1.test2 = test2;
            querystring.stringify(test1);
        });
    });

    test("parse handles flat objects", function () {
        deepEqual(querystring.parse('test=t&test2=2'), { test: 't', test2: 2 });
    });

    test("parse strips leading question mark", function () {
        deepEqual(querystring.parse('?test=t&test2=2'), { test: 't', test2: 2 });
    });

    test("parse handles nested objects", function () {
        deepEqual(querystring.parse('test[test2]=t'), { test: { test2: 't' } });
        deepEqual(querystring.parse('test[test2][test3]=t'), { test: { test2: { test3: 't' } } });
    });

    test("parse handles arrays", function () {
        deepEqual(querystring.parse('test[test2][][test3]=t'), { test: { test2: [{ test3: 't' }] } });
    });
})();

// Unit/Types/Flow.tests.js
(function () {
    var spy;
    var pubsub;
    var pane;
    var node;
    
    module('Unit.Types.Flow', {
        setup: function () {
            spy = sinon.spy();
            pubsub = new Tribe.PubSub({ sync: true });
            pane = new TC.Types.Pane({ pubsub: pubsub });
            node = new TC.Types.Node(null, pane);
            node.findNavigation = function () { return { node: { navigate: spy, pane: pane } }; };
        }
    });
    
    test("constructor arguments are passed to definition constructor", function () {
        expect(2);
        var f = new TC.Types.Flow(node, constructor, 'arg1', 'arg2');
        function constructor(flow, arg1, arg2) {
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });

    test("arguments to Node.startFlow are passed to definition constructor", function () {
        expect(2);
        var f = node.startFlow(constructor, 'arg1', 'arg2');
        function constructor(flow, arg1, arg2) {
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });

    test("arguments to Pane.startFlow are passed to definition constructor", function () {
        expect(2);
        var f = pane.startFlow(constructor, 'arg1', 'arg2');
        function constructor(flow, arg1, arg2) {
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });

    test("Flow calls navigate on navigation pane when to is called", function () {
        var f = new TC.Types.Flow(node, TestFlow).start();
        f.to('path', 'data')();
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'path');
        equal(spy.firstCall.args[1], 'data');
    });

    test("Flow calls navigate on navigation pane when message is received for to event", function () {
        var f = new TC.Types.Flow(node, TestFlow).start();
        pubsub.publish('to');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'path');
        equal(spy.firstCall.args[1], 'data');
    });

    test("No handlers are executed after flow ends", function () {
        var f = new TC.Types.Flow(node, TestFlow).start();
        pubsub.publish('to');
        pubsub.publish('end');
        pubsub.publish('to');
        ok(spy.calledOnce);
    });

    test("No handlers are executed after flow ends with null handler", function () {
        var f = new TC.Types.Flow(node, TestFlow).start();
        pubsub.publish('to');
        pubsub.publish('null');
        pubsub.publish('to');
        ok(spy.calledOnce);
    });

    test("Child onstart handler is executed when start child message is received", function () {
        var f = new TC.Types.Flow(node, TestFlow).start();
        pubsub.publish('startChild');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'child');
    });

    test("Child handlers are executed after start child message is received", function () {
        var f = new TC.Types.Flow(node, TestFlow).start();
        pubsub.publish('navigateChild');
        pubsub.publish('startChild');
        pubsub.publish('navigateChild');
        ok(spy.calledTwice);
    });

    test("Child handlers are not executed after end child message is received", function () {
        var f = new TC.Types.Flow(node, TestFlow).start();
        pubsub.publish('startChild');
        pubsub.publish('navigateChild');
        pubsub.publish('endChild');
        pubsub.publish('navigateChild');
        ok(spy.calledTwice);
    });

    test("Child handlers are not executed after end flow message is received", function () {
        var f = new TC.Types.Flow(node, TestFlow).start();
        pubsub.publish('startChild');
        pubsub.publish('navigateChild');
        pubsub.publish('end');
        pubsub.publish('navigateChild');
        ok(spy.calledTwice);
    });

    test("Sagas started with startSaga end when this flow ends", function() {
        var f = new TC.Types.Flow(node, TestFlow).start();
        var sagaHandler = sinon.spy();
        f.startSaga({ handles: { 'sagaMessage': sagaHandler } });
        pubsub.publish('sagaMessage');
        ok(sagaHandler.calledOnce);
        f.end();
        pubsub.publish('sagaMessage');
        ok(sagaHandler.calledOnce);
    });

    test("Child flows are constructed with same flow object", function () {
        expect(1);
        var f = new TC.Types.Flow(node, ParentFlow).start();
        pubsub.publish('assertFlowEqual', f);
    });

    test("Child flows end when a parent message is published", function () {
        expect(1);
        var f = new TC.Types.Flow(node, ParentFlow).start();
        pubsub.publish('assertFlowEqual', f);
        f.end();
        pubsub.publish('assertFlowEqual', f);
    });

    function TestFlow(flow) {
        this.handles = {
            'to': flow.to('path', 'data'),
            'startChild': {
                onstart: flow.to('child'),
                'navigateChild': flow.to('child2'),
                'endChild': null
            },
            'end': flow.end,
            'null': null
        };
    }

    function ParentFlow(flow) {
        this.handles = {
            onstart: flow.start(ChildFlow),
            parentMessage: function () { }
        };
    }

    function ChildFlow(flow) {
        this.handles = {
            'assertFlowEqual': function(otherFlow) {
                equal(otherFlow, flow);
            }
        };
    }
})();

// Unit/Types/History.tests.js
(function () {
    var history;
    var api;

    module('Unit.Types.History', {
        setup: function () {
            api = mockHistoryApi();
            history = new TC.Types.History(api);
        },
        teardown: function () {
            history.dispose();
        }
    });

    test("browser.go is raised when popstate event is raised normally", function () {
        if (Test.supportsHistory) {
            expect(1);

            function assert(e) {
                equal(e.eventData.count, 1);
            }

            TC.Utils.handleDocumentEvent('browser.go', assert);
            raisePopstate();
            TC.Utils.detachDocumentEvent('browser.go', assert);
        } else ok(true, "Test skipped - History API is not supported.");
    });

    test("browser.go is not raised when update is called and popstate is raised", function () {
        if (Test.supportsHistory) {
            expect(0);

            function assert(e) {
                equal(e.eventData.count, 1);
            }

            TC.Utils.handleDocumentEvent('browser.go', assert);
            history.update(1);
            raisePopstate();
            TC.Utils.detachDocumentEvent('browser.go', assert);
        } else ok(true, "Test skipped - History API is not supported.");
    });

    test("window.history.go is called when go is called", function () {
        history.go(1);
        ok(api.go.calledOnce);
    });

    test("window.history.pushState is called when navigate is called", function() {
        history.navigate();
        ok(api.pushState.calledOnce);
    });

    test("window.history.pushState is called with url and title if urlProvider is passed", function() {
        history.navigate({ url: 'url1', title: 'title1' });
        equal(api.pushState.firstCall.args[1], 'title1');
        equal(api.pushState.firstCall.args[2], 'url1');
    });

    function mockHistoryApi() {
        return {
            pushState: sinon.spy(),
            go: sinon.spy(),
            replaceState: sinon.spy()
        };
    }

    function raisePopstate() {
        Test.raiseDocumentEvent('popstate', null, 1);
    }
})();

// Unit/Types/Loader.tests.js
(function() {
    var resources;
    var context;
    
    module("Unit.Types.Loader", {
        setup: function () {
            context = Test.Unit.context();
            resources = new TC.Types.Loader();
        }
    });

    test("get should call handler for file extension from passed url", function () {
        var spy = sinon.spy();
        TC.LoadHandlers.test = spy;
        resources.get('test.test');
        ok(spy.calledOnce);
    });

    test("get should call handler with url, resourcePath and context", function () {
        var spy = sinon.spy();
        TC.LoadHandlers.test = spy;
        resources.get('test.test', 'test/test', context);
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'test.test');
        equal(spy.firstCall.args[1], 'test/test');
        equal(spy.firstCall.args[2], context);
    });

    test("when passed the same url, get should return the same deferred from first call to handler", function () {
        var deferred = $.Deferred();
        TC.LoadHandlers.test = sinon.stub().returns(deferred);
        equal(resources.get('test.test'), deferred);
        equal(resources.get('test.test'), deferred);
    });

    test("get should return null after deferred from first call to handler completes", function () {
        var deferred = $.Deferred();
        TC.LoadHandlers.test = sinon.stub().returns(deferred);
        equal(resources.get('test.test'), deferred);
        deferred.resolve();
        equal(resources.get('test.test'), null);
    });

    test("get should return null after deferred from first call to handler fails", function () {
        var deferred = $.Deferred();
        TC.LoadHandlers.test = sinon.stub().returns(deferred);
        equal(resources.get('test.test'), deferred);
        deferred.reject();
        equal(resources.get('test.test'), null);
    });

    test("get should return different deferred for each unique url", function () {
        TC.LoadHandlers.test = function () { return $.Deferred(); };
        var result1 = resources.get('test1.test');
        var result2 = resources.get('test2.test');
        notEqual(result1, result2);
    });
})();

// Unit/Types/Logger.tests.js
(function() {
    var logger;

    module("Unit.Types.Logger", {
        setup: function () {
            TC.Loggers.test = sinon.spy();
            logger = new TC.Types.Logger();
            logger.setLogger('test');
        }
    });

    test("logger is called with level and message", function() {
        logger.warn('test');
        ok(TC.Loggers.test.calledOnce);
        ok(TC.Loggers.test.calledWithExactly('warn', 'test'));
    });

    test("default log level logs everything", function() {
        logger.debug();
        logger.info();
        logger.warn();
        logger.error();
        equal(TC.Loggers.test.callCount, 4);
    });

    test("only levels equal or higher than the set value are logged", function () {
        logger.setLogLevel('warn');
        logger.debug();
        logger.info();
        ok(TC.Loggers.test.notCalled);
        logger.warn();
        logger.error();
        ok(TC.Loggers.test.calledTwice);
    });
})();
// Unit/Types/Models.tests.js
(function() {
    var models;

    module('Unit.Types.Models', {
        setup: function() { models = new TC.Types.Models(); }
    });

    test("register stores model as property with constructor and options", function () {
        var constructor = function () { };
        var options = {};
        models.register('test', constructor, options);
        equal(models.test.constructor, constructor);
        equal(models.test.options, options);
    });
})();
// Unit/Types/Navigation.tests.js
(function () {
    var nav;
    var node;

    module('Unit.Types.Navigation', {
        setup: function () {
            node = nodeStub('test');
            nav = new TC.Types.Navigation(node, { transition: 'fade' });
            TC.history = { navigate: sinon.spy(), update: sinon.spy() };
        },
        teardown: function() {
            nav.dispose();
        }
    });

    test("forward transitions to specified pane", function () {
        var navigateArgs = { path: 'test2' };
        nav.navigate(navigateArgs);
        equal(node.transitionTo.firstCall.args[0], navigateArgs);
        equal(node.transitionTo.firstCall.args[1], 'fade');
    });

    test("forward accepts string transition as options", function () {
        nav = new TC.Types.Navigation(node, 'fade');
        var navigateArgs = { path: 'test2' };
        nav.navigate(navigateArgs);
        equal(node.transitionTo.firstCall.args[0], navigateArgs);
        equal(node.transitionTo.firstCall.args[1], 'fade');
    });

    test("back returns to initial pane with reverse transition", function() {
        nav.navigate({ path: 'test2' });
        nav.go(-1);
        equal(node.transitionTo.secondCall.args[0].path, 'test');
        equal(node.transitionTo.secondCall.args[2], true);
    });

    test("back returns to previous pane", function () {
        nav.navigate({ path: 'test2' });
        nav.navigate({ path: 'test3' });
        nav.go(-1);
        equal(node.transitionTo.lastCall.args[0].path, 'test2');
    });

    test("back does nothing if no stack", function () {
        nav.go(-1);
        ok(node.transitionTo.notCalled);
    });

    test("forward does nothing if no stack", function () {
        nav.go(1);
        ok(node.transitionTo.notCalled);
    });

    test("back two returns to initial pane", function() {
        nav.navigate({ path: 'test2' });
        nav.navigate({ path: 'test3' });
        nav.go(-2);
        equal(node.transitionTo.lastCall.args[0].path, 'test');
    });

    test("forward moves stack forward if stack exists", function () {
        nav.navigate({ path: 'test2' });
        nav.navigate({ path: 'test3' });
        nav.go(-2);
        nav.go(1);
        equal(node.transitionTo.lastCall.args[0].path, 'test2');
    });

    test("document navigating event is raised when navigating", function () {
        expect(1);
        TC.Utils.handleDocumentEvent('navigating', assert);
        nav.navigate({ path: 'test2' });
        TC.Utils.detachDocumentEvent('navigating', assert);
        
        function assert(e) {
            equal(e.eventData.options.path, 'test2');
        }
    });

    test("TC.history.navigate is called on navigate when browser option is set", function() {
        nav = new TC.Types.Navigation(node, { browser: true });
        nav.navigate({ path: 'test2' });
        ok(TC.history.navigate.calledOnce);
    });

    test("TC.history.update is called on go when browser option is set", function () {
        nav = new TC.Types.Navigation(node, { browser: true });
        nav.navigate({ path: 'test2' });
        nav.go(-1);
        ok(TC.history.update.calledOnce);
    });

    test("node transitions when browser.go event is received", function() {
        nav = new TC.Types.Navigation(node, { browser: true });
        nav.navigate({ path: 'test2' });
        TC.Utils.raiseDocumentEvent('browser.go', { count: -1 });
        equal(node.transitionTo.secondCall.args[0].path, 'test');
    });

    test("initial state is set from urlProvider if paneOptionsFrom returns paneOptions object", function () {
        var provider = {
            paneOptionsFrom: function() {
                return {
                    path: 'test',
                    data: { test: 'test' }
                };
            }
        };
        nav = new TC.Types.Navigation(node, { browser: provider });
        deepEqual(nav.stack[0], provider.paneOptionsFrom());
    });

    test("initial state is not set from urlProvider if paneOptionsFrom returns null", function() {
        var provider = {
            paneOptionsFrom: function () { return null; }
        };
        nav = new TC.Types.Navigation(node, { browser: provider });
        deepEqual(nav.stack[0].path, 'test');
    });

    test("history url and title are set from urlProvider when navigating", function () {
        var provider = {
            paneOptionsFrom: function () { return null; },
            urlDataFrom: function() {
                return {
                    url: 'test',
                    title: 'test'
                };
            }
        };
        nav = new TC.Types.Navigation(node, { browser: provider });
        nav.navigate({ path: 'test2' });
        deepEqual(TC.history.navigate.firstCall.args[0], provider.urlDataFrom());
    });

    Test.urlProvider = {
        urlDataFrom: function() {
            return {
                url: 'test',
                title: 'test'
            };
        },
        paneOptionsFrom: function() {
            return {
                path: 'test',
                data: { test: 'test' }
            };
        }
    };

    function nodeStub(path) {
        return {
            id: 1,
            pane: { path: path },
            transitionTo: sinon.spy()
        };
    }
})();

// Unit/Types/Node.findNavigation.tests.js
(function () {
    module('Unit.Types.Node');

    test("node creates Navigation if handlesNavigation is set on pane", function() {
        var node = new TC.Types.Node(null, pane('test', true));
        ok(node.navigation);
    });

    test("findNavigation returns Navigation for root node if no pane handles navigation", function() {
        var leaf = createTree();
        equal(leaf.findNavigation().node, leaf.root);
        equal(leaf.parent.findNavigation().node, leaf.root);
        equal(leaf.root.findNavigation().node, leaf.root);
    });

    test("findNavigation returns Navigation for root node if specified", function () {
        var leaf = createTree('root');
        equal(leaf.findNavigation().node, leaf.root);
        equal(leaf.parent.findNavigation().node, leaf.root);
        equal(leaf.root.findNavigation().node, leaf.root);
    });

    test("findNavigation returns Navigation for middle node if specified", function () {
        var leaf = createTree('middle');
        equal(leaf.findNavigation().node, leaf.parent);
        equal(leaf.parent.findNavigation().node, leaf.parent);
        equal(leaf.root.findNavigation().node, leaf.parent);
    });

    test("findNavigation returns Navigation for leaf node if specified", function () {
        var leaf = createTree('leaf');
        equal(leaf.findNavigation().node, leaf);
        equal(leaf.parent.findNavigation().node, leaf);
        equal(leaf.root.findNavigation().node, leaf);
    });

    test("findNavigation returns Navigation for root node if handling node disposed", function () {
        var leaf = createTree('leaf');
        var middle = leaf.parent;
        leaf.dispose();
        equal(middle.findNavigation().node, middle.root);
        equal(leaf.parent.findNavigation().node, middle.root);
    });
    
    function pane(path, handlesNavigation) {
        return new TC.Types.Pane({ path: path, handlesNavigation: handlesNavigation });
    }

    function createTree(navigationNode) {
        var root = new TC.Types.Node(null, pane('root', navigationNode === 'root'));
        var middle = new TC.Types.Node(root, pane('middle', navigationNode === 'middle'));
        var leaf = new TC.Types.Node(middle, pane('leaf', navigationNode === 'leaf'));
        return leaf;
    }
})();
// Unit/Types/Node.tests.js
(function () {
    module('Unit.Types.Node');

    function pane(path, handlesNavigation) {
        return new TC.Types.Pane({ path: path, handlesNavigation: handlesNavigation });
    }

    test("setPane makes path absolute and sets pane path from pane if no parent", function() {
        var node = new TC.Types.Node(null, pane('test'));
        equal(node.pane.path, '/test');
    });

    test("setPane sets pane path from parent and relative pane path", function () {
        var parent = new TC.Types.Node(null, pane('/path/parent'));
        var node = new TC.Types.Node(parent, pane('child'));
        equal(node.pane.path, '/path/child');
    });

    test("setPane sets pane path from pane if path is absolute", function () {
        var parent = new TC.Types.Node(null, pane('/path/parent'));
        var node = new TC.Types.Node(parent, pane('/root'));
        equal(node.pane.path, '/root');
    });

    test("setPane unsets node on existing pane", function () {
        var existingPane = pane('test');
        var node = new TC.Types.Node(null, existingPane);
        node.setPane(new TC.Types.Pane(pane('test2')));
        equal(existingPane.node, null);
    });

    test("setPane sets node.navigation when pane.handlesNavigation", function() {
        var node = new TC.Types.Node();
        node.setPane(pane('', 'test'));
        ok(node.navigation.constructor, TC.Types.Navigation);
    });

    test("node root is set correctly", function() {
        var one = new TC.Types.Node(null, pane('one'));
        var two = new TC.Types.Node(one, pane('two'));
        var three = new TC.Types.Node(two, pane('three'));

        equal(one.root, one);
        equal(two.root, one);
        equal(three.root, one);
    });

    test("dispose removes node from parent collection", function() {
        var parent = new TC.Types.Node(null, pane('parent'));
        var child = new TC.Types.Node(parent, pane('child'));
        equal(parent.children.length, 1);
        child.dispose();
        equal(parent.children.length, 0);
    });

    test("navigate inherits path from existing pane", function () {
        var node = new TC.Types.Node(null, pane('/path/node1'));
        node.transitionTo = sinon.spy();
        node.navigate('node2');
        ok(node.transitionTo.calledOnce);
        equal(node.transitionTo.firstCall.args[0].path, '/path/node2');
    });

    test("nodeForPath returns current node if skipPath is not specified", function() {
        var node1 = new TC.Types.Node(null, pane('/path1/node1'));
        var node2 = new TC.Types.Node(node1, pane('/path2/node2'));
        equal(node2.nodeForPath(), node2);
    });

    test("nodeForPath returns parent if skipPath is specified", function() {
        var node1 = new TC.Types.Node(null, pane('/path1/node1'));
        var node2 = new TC.Types.Node(node1, pane('/path2/node2'));
        node2.skipPath = true;
        equal(node2.nodeForPath(), node1);
    });

    test("nodeForPath recurses, skipping nodes as specified", function () {
        var node1 = new TC.Types.Node(null, pane('/path1/node1'));
        var node2 = new TC.Types.Node(node1, pane('/path2/node2'));
        var node3 = new TC.Types.Node(node2, pane('/path2/node2'));
        node2.skipPath = true;
        node3.skipPath = true;
        equal(node3.nodeForPath(), node1);
    });
})();
// Unit/Types/Operation.tests.js
(function () {
    var operation;
    
    module("Unit.Types.Operation", {
        setup: function() { operation = new TC.Types.Operation(); }
    });

    test("operation resolves when single child completes", function () {
        operation.add(1);
        equal(operation.promise.state(), 'pending');
        operation.complete(1);
        equal(operation.promise.state(), 'resolved');
    });

    test("operation resolves when two children complete", function() {
        operation.add(1);
        operation.add(2);
        operation.complete(1);
        equal(operation.promise.state(), 'pending');
        operation.complete(2);
        equal(operation.promise.state(), 'resolved');
    });
})();

// Unit/Types/Pane.tests.js
(function() {
    module('Unit.Types.Pane');

    test("inheritPathFrom inherits path if pane path is relative", function () {
        var pane = new TC.Types.Pane({ path: 'pane2' });
        pane.inheritPathFrom(wrap({ path: '/Test/pane1' }));
        equal(pane.path, '/Test/pane2');
    });

    test("inheritPathFrom doesn't inherit path if pane path is absolute", function () {
        var pane = new TC.Types.Pane({ path: '/pane2' });
        pane.inheritPathFrom(wrap({ path: '/Test/pane1' }));
        equal(pane.path, '/pane2');
    });

    test("inheritPathFrom sets child folders from relative pane path", function () {
        var pane = new TC.Types.Pane({ path: 'Test2/pane2' });
        pane.inheritPathFrom(wrap({ path: '/Test/pane1' }));
        equal(pane.path, '/Test/Test2/pane2');
    });
    
    function wrap(pane) {
        return {
            nodeForPath: function() {
                return { pane: pane };
            }
        };
    }
})();

// Unit/Types/Pipeline.tests.js
(function () {
    var events;
    var pipeline;
    var eventDeferred;
    var context = {};

    module("Unit.Types.Pipeline", {
        setup: function() {
            events = testEvents();
            pipeline = new TC.Types.Pipeline(events, context);
        }
    });

    test("event handlers specified are called", function () {
        pipeline.execute(['null1']);
        ok(events.null1.calledOnce);
    });

    test("event handlers are passed target and context", function () {
        var target = {};
        pipeline.execute(['null1'], target);
        ok(events.null1.calledWithExactly(target, context));
    });

    test("events returning null are executed synchronously", function () {
        pipeline.execute(['null1', 'null2']);
        ok(events.null1.calledOnce);
        ok(events.null2.calledOnce);
    });

    test("events are executed when previous event resolves", function() {
        pipeline.execute(['deferred', 'null1']);
        ok(events.null1.notCalled);
        eventDeferred.resolve();
        ok(events.null1.calledOnce);
    });

    test("rejected events terminate pipeline execution", function() {
        pipeline.execute(['deferred', 'null1']);
        eventDeferred.reject();
        ok(events.null1.notCalled);
    });

    test("execute returns deferred that resolves on completion", function() {
        var deferred = pipeline.execute(['deferred']);
        equal(deferred.state(), 'pending');
        eventDeferred.resolve();
        equal(deferred.state(), 'resolved');
    });
    
    test("execute returns deferred that rejects on failure", function () {
        var deferred = pipeline.execute(['deferred']);
        equal(deferred.state(), 'pending');
        eventDeferred.reject();
        equal(deferred.state(), 'rejected');
    });

    function testEvents() {
        eventDeferred = $.Deferred();
        
        return {
            null1: sinon.spy(),
            null2: sinon.spy(),
            deferred: sinon.stub().returns(eventDeferred)
        };
    }
})();

// Unit/Types/Templates.tests.js
(function () {
    var templates;
    
    module('Unit.Types.Templates', {
        setup: function () { templates = new TC.Types.Templates(); },
        teardown: function () { $('head script[type="text/template"]').remove(); }
    });

    test("store wraps template in script tag with resource path as id", function() {
        templates.store('<br/>', 'test');
        notEqual($('head script#template-test').html().indexOf('<br/>'), -1);
    });

    test("render replaces content of target with stored template", function () {
        $('#qunit-fixture').text('previous');
        templates.store('content', 'test');
        templates.render('#qunit-fixture', 'test');
        notEqual($('#qunit-fixture').html().indexOf('content'), -1);
    });
    
    test("loaded returns true if template has been loaded for specified path", function () {
        templates.store('<br/>', 'test');
        ok(templates.loaded('test'));
    });
})();
// Unit/LoadHandlers/scripts.tests.js
(function() {
    var originalEval = $.globalEval;
    var url = 'test.js';
    var resourcePath = '/test';
    var response = "";
    var context;
    
    $.mockjax({
        url: url,
        response: function() { this.responseText = response; }
    });
    
    module("Unit.LoadHandlers.scripts", {
        setup: function() {
            context = Test.Unit.context();
        },
        teardown: function () { $.globalEval = originalEval; }
    });

    test("script handler returns promise object", function() {
        ok(TC.LoadHandlers.js(url, resourcePath, context).promise);
    });

    test("script handler executes globalEval with response", function () {
        $.globalEval = sinon.spy();
        response = "test";
        TC.LoadHandlers.js(url, resourcePath, context);
        ok($.globalEval.calledOnce);
        equal($.globalEval.firstCall.args[0].substring(0, response.length), response);
    });

    test("script handler appends sourceURL tag", function () {
        $.globalEval = sinon.spy();
        response = "test";
        TC.LoadHandlers.js(url, resourcePath, context);
        ok($.globalEval.calledOnce);
        equal($.globalEval.firstCall.args[0].substring(response.length + 1), "//@ sourceURL=tribe://Application/test.js");
    });

    test("script handler sets TC.scriptEnvironment before executing scripts", function () {
        expect(1);
        response = "equal(TC.scriptEnvironment.resourcePath, '" + resourcePath + "');";
        TC.LoadHandlers.js(url, resourcePath, context);
    });

    test("script handler clears TC.scriptEnvironment after executing scripts", function () {
        TC.LoadHandlers.js(url, resourcePath, context);
        equal(TC.scriptEnvironment, undefined);
    });
})();

// Unit/LoadHandlers/stylesheets.tests.js
(function() {
    var url = 'test.css';
    var resourcePath = '/test';
    var response = "";
    
    $.mockjax({
        url: url,
        response: function() { this.responseText = response; }
    });

    module('Unit.LoadHandlers.stylesheets');
    
    test("stylesheet handler returns promise object", function() {
        ok(TC.LoadHandlers.css(url, resourcePath, Test.Unit.context()).promise);
    });

    test("stylesheet handler adds stylesheet to page header", function () {
        response = ".test{}";
        TC.LoadHandlers.css(url, resourcePath, Test.Unit.context());
        notEqual($('#__tribeStyles').html().indexOf(".test"), -1);
    });
})();

// Unit/LoadHandlers/templates.tests.js
(function() {
    var url = 'test.htm';
    var resourcePath = '/test';
    var response = '<br/>';
    var context;
    
    $.mockjax({
        url: url,
        response: function() { this.responseText = response; }
    });

    module('Unit.LoadHandlers.templates', {
        setup: function () { context = Test.Unit.context(); }
    });

    test("template handler returns promise object", function() {
        ok(TC.LoadHandlers.htm(url, resourcePath, context).promise);
    });

    test("template is stored with resource path identifier", function() {
        TC.LoadHandlers.htm(url, resourcePath, context);
        ok(context.templates.store.calledOnce);
        ok(context.templates.store.calledWithExactly('<br/>', '/test'));
    });
})();

// Unit/LoadStrategies/adhoc.tests.js
(function () {
    var context;
    
    module("Unit.LoadStrategies.adhoc", {
        setup: function () { context = Test.Unit.context(); }
    });

    test("loader.get is called for each resource", function () {
        TC.LoadStrategies.adhoc({ path: 'new' }, context);
        ok(context.loader.get.calledThrice);
        ok(context.loader.get.firstCall.calledWithExactly('new.js', 'new', context));
        ok(context.loader.get.secondCall.calledWithExactly('new.htm', 'new', context));
        ok(context.loader.get.thirdCall.calledWithExactly('new.css', 'new', context));
    });

    test("loader.get is called with base path combined with pane path", function () {
        context = Test.Unit.context();
        context.options.basePath = 'panes';
        TC.LoadStrategies.adhoc({ path: 'test2' }, context);
        ok(context.loader.get.firstCall.calledWithExactly('panes/test2.js', 'test2', context));
    });

    test("subsequent calls with the same path returns the same deferred object", function () {
        var deferred = $.Deferred();
        context.loader.get = function() { return deferred; };
        var result1 = TC.LoadStrategies.adhoc({ path: 'test' }, context);
        var result2 = TC.LoadStrategies.adhoc({ path: 'test' }, context);
        equal(result1, result2);
    });

    test("subsequent calls with the same path returns null after the deferred has been resolved", function () {
        var deferred = $.Deferred();
        context.loader.get = function () { return deferred; };
        TC.LoadStrategies.adhoc({ path: 'test' }, context);
        deferred.resolve();
        equal(TC.LoadStrategies.adhoc({ path: 'test' }, context), null);
    });

    test("subsequent calls with the same path returns null after the deferred has been rejected", function () {
        var deferred = $.Deferred();
        context.loader.get = function () { return deferred; };
        TC.LoadStrategies.adhoc({ path: 'test' }, context);
        deferred.reject();
        equal(TC.LoadStrategies.adhoc({ path: 'test' }, context), null);
    });

    test("loader.get is not called when model has been loaded", function () {
        TC.LoadStrategies.adhoc({ path: 'test' }, context);
        ok(context.loader.get.notCalled);
    });

    test("loader.get is not called when template has been loaded", function () {
        context.templates.loaded = function() { return true; };
        TC.LoadStrategies.adhoc({ path: 'new' }, context);
        ok(context.loader.get.notCalled);
    });
})();
// Unit/LoadStrategies/preloaded.tests.js
module('Unit.LoadStrategies.preloaded');

test("returns rejected promise if no resources have been loaded for the specified path", function() {
    var context = Test.Unit.context();
    var promise = TC.LoadStrategies.preloaded({ path: 'test2' }, context);
    equal(promise.state(), 'rejected');
});
// Unit/Events/createModel.tests.js
(function () {
    var context;
    var node;
    
    module("Unit.Events.createModel", {
        setup: function () {
            context = Test.Unit.context();
            pane = Test.Unit.node().pane;
        }
    });

    test("model is created from stored constructor", function () {
        TC.Events.createModel(pane, context);
        ok(context.models.test.constructor.calledOnce);
    });

    test("default model is created if no constructor defined", function () {
        context.models.test.constructor = null;
        TC.Events.createModel(pane, context);
        equal(pane.model.pane, pane);
    });
})();
// Unit/Events/renderComplete.tests.js
(function () {
    var pane, context;
    
    module("Unit.Events.renderComplete", {
        setup: function() {
            pane = new TC.Types.Pane({ element: '#qunit-fixture', transition: 'test' });
            pane.model = { renderComplete: sinon.spy() };
            context = Test.Unit.context();
            TC.Transitions.test = { 'in': sinon.spy() };
        }
    });

    test("renderComplete calls transition.in with pane element", function () {
        TC.Events.renderComplete(pane, context);
        ok(TC.Transitions.test['in'].calledOnce);
        equal(TC.Transitions.test['in'].firstCall.args[0], pane.element);
    });

    test("renderComplete calls renderComplete on pane model", function () {
        TC.Events.renderComplete(pane, context);
        ok(pane.model.renderComplete.calledOnce);
    });

    test("renderComplete resolves is.rendered on pane model", function () {
        equal(pane.is.rendered.state(), 'pending');
        TC.Events.renderComplete(pane, context);
        equal(pane.is.rendered.state(), 'resolved');
    });

    test("renderComplete raises renderComplete event on document, passing pane as data", function () {
        var spy = sinon.spy();
        TC.Utils.handleDocumentEvent("renderComplete", spy);
        TC.Events.renderComplete(pane, context);
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0].eventData, pane);
        TC.Utils.detachDocumentEvent("renderComplete", spy);
    });
})();
// Unit/Events/renderPane.tests.js
(function () {
    var node;
    var context;

    module("Unit.Events.renderPane", {
        setup: function () {
            context = Test.Unit.context();
            pane = Test.Unit.node().pane;
            context.setTemplate('<div/>');
        }
    });

    test("templates.render is called with identifier and element", function () {
        TC.Events.renderPane(pane, context);
        ok(context.templates.render.calledOnce);
        ok(context.templates.render.calledWithExactly(pane.element, 'test'));
    });

    test("paneRendered function is called on the model", function () {
        TC.Events.renderPane(pane, context);
        ok(pane.model.paneRendered.calledOnce);
    });
})();
// Unit/Transitions/transition.tests.js
(function () {
    var pane, node;
    
    module('Unit.transition', {
        setup: function () {
            Test.Integration.createTestElement();
            TC.Transitions.test = { 'in': sinon.spy(), out: sinon.spy(), reverse: 'test2' };
            TC.Transitions.test2 = { 'in': sinon.spy(), out: sinon.spy(), reverse: 'test' };
            pane = new TC.Types.Pane({ transition: 'test', element: '.test' });
            node = new TC.Types.Node(null, pane);
        }
    });

    test("transition executes specified in transition against given element", function () {
        TC.transition('.test', 'test')['in']();
        equal(TC.Transitions.test['in'].firstCall.args[0], '.test');
    });

    test("transition executes specified out transition against given element", function () {
        TC.transition('.test', 'test').out();
        equal(TC.Transitions.test.out.firstCall.args[0], '.test');
    });

    test("transition gets target element and transition from node", function () {
        TC.transition(node)['in']();
        equal(TC.Transitions.test['in'].firstCall.args[0], '.test');
    });

    test("transition gets target element and transition from pane", function () {
        TC.transition(pane)['in']();
        equal(TC.Transitions.test['in'].firstCall.args[0], '.test');
    });

    test("specifying transition as argument overrides pane transition", function() {
        TC.Transitions.test2 = { 'in': sinon.spy(), out: sinon.spy() };
        TC.transition(pane, 'test2')['in']();
        ok(TC.Transitions.test['in'].notCalled);
        ok(TC.Transitions.test2['in'].calledOnce);
    });

    test("transitioning out removes element by default", function () {
        TC.transition('.test').out();
        equal($('.test').length, 0);
    });

    test("transitioning out hides element if specified", function () {
        TC.transition('.test').out(false);
        equal($('.test').length, 1);
    });

    test("reverse transition is executed when specified", function() {
        TC.transition('.test', 'test', true)['in']();
        equal(TC.Transitions.test2['in'].firstCall.args[0], '.test');

    });
})();

// Integration/api.tests.js
(function () {
    module("Integration.api", { teardown: Test.Integration.teardown });

    test("arguments can be passed to registerModel in any order", function () {
        var path = 'path';
        var options = {};
        var constructor = function () { };

        TC.registerModel(path, options, constructor);
        equal(Test.Integration.context.models.path.options, options);
        equal(Test.Integration.context.models.path.constructor, constructor);

        TC.registerModel(options, constructor, path);
        equal(Test.Integration.context.models.path.options, options);
        equal(Test.Integration.context.models.path.constructor, constructor);
    });

    test("registerModel takes path from TC.scriptEnvironment", function () {
        var constructor = function () { };
        TC.scriptEnvironment = { resourcePath: 'test' };
        TC.registerModel(constructor);
        equal(Test.Integration.context.models.test.constructor, constructor);
    });
})();
// Integration/bindingHandler.tests.js
(function() {
    module('Integration.bindingHandler', {
        setup: function() {
            TC.Events.spy = sinon.spy();
            TC.options.events = ['spy'];
        }, teardown: Test.Integration.teardown
    });

    test("pane path is set from string binding value", function() {
        executeHandler({ value: 'test' });
        equal(pane().path, '/test');
    });

    test("pane properties are set from object binding value", function() {
        executeHandler({ value: { path: 'test', data: 'test2' } });
        equal(pane().path, '/test');
        equal(pane().data, 'test2');
    });

    test("pane data is set from other binding value", function() {
        executeHandler({ otherValues: { data: 'data' } });
        equal(pane().data, 'data');
    });

    test("pane element is set from element argument", function() {
        executeHandler({ element: '#qunit-fixture' });
        equal(pane().element, $('#qunit-fixture')[0]);
    });

    test("parent node is extracted from bindingContext", function () {
        var parentNode = Test.Unit.node();
        executeHandler({ bindingContext: { $root: { __node: parentNode } } });
        equal(pane().node.parent, parentNode);
    });

    function executeHandler(values) {
        values = values || {};
        return ko.bindingHandlers.pane.init(
            values.element,
            accessor(values.value || ''),
            accessor(values.otherValues || {}),
            values.viewModel,
            values.bindingContext || {});
    }
    
    function accessor(value) {
        return function() { return value; };
    }
    
    function pane() {
        return TC.Events.spy.firstCall.args[0];
    }
})();
// Integration/History.tests.js
//(function () {
//    var history;

//    module('Integration.History', {
//        setup: function () {
//            history = new TC.Types.History(window.history);
//            Test.Integration.createTestElement();
//        },
//        teardown: function() {
//            history.dispose();
//        }
//    });

//    test("History sets window state when navigating", function () {
//        TC.createNode('.test', { path: 'History/layout' });
//        TC.nodeFor('.content1').navigate('content2');
//        var options = JSON.parse(window.history.state.options);
//        equal(options.path, '/History/content2');
//    });

//    // these tests sometimes seem to do strange things to the Chrome debugger. If breakpoints aren't being hit, this is the culprit.
//    asyncTest("History transitions navigation node to previous state when back is called", function () {
//        expect(2);
//        TC.createNode('.test', { path: '/History/layout' });
//        TC.nodeFor('.content1').navigate('content2');
//        window.history.back();
//        setTimeout(function() {
//            equal($('.content2').length, 0);
//            equal($('.content1').length, 1);
//            start();
//        }, 50);
//    });

//    asyncTest("History transitions navigation node to next state when forward is called", function () {
//        expect(2);
//        TC.createNode('.test', { path: '/History/layout' });
//        TC.nodeFor('.content1').navigate('content2');
//        window.history.back();
//        setTimeout(function () {
//            window.history.forward();
//            setTimeout(function () {
//                equal($('.content2').length, 1);
//                equal($('.content1').length, 0);
//                start();
//            }, 50);
//        }, 50);
//    });

//    test("document navigating event is raised once", function () {
//        expect(2);
//        $(document).on('navigating', function(e, data) {
//            equal(data.options.path, '/Navigate/content2');
//            equal(data.options.data, 'test');
//        });
//        TC.createNode('.test', { path: 'Navigate/layout' });
//        TC.nodeFor('.content1').navigate({ path: 'content2', data: 'test' });
//        $(document).off('navigating');
//    });
//})();

// Integration/Navigate.tests.js
module('Integration.Navigate', {
    setup: Test.Integration.createTestElement,
    teardown: Test.Integration.teardown
});

test("navigating child pane transitions node marked with handlesNavigation", function () {
    TC.createNode('.test', { path: 'Navigate/layout' });
    TC.nodeFor('.child1').navigate('content2');
    equal($('.child2').length, 1);
    equal($('.content1').length, 0);
});

test("navigating root pane transitions node marked with handlesNavigation", function () {
    TC.createNode('.test', { path: 'Navigate/layout' });
    TC.nodeFor('.layout').navigate('content2');
    equal($('.layout').length, 1);
    equal($('.child2').length, 1);
    equal($('.content1').length, 0);
});

test("navigating back returns to previous pane", function() {
    TC.createNode('.test', { path: 'Navigate/layout' });
    var node = TC.nodeFor('.layout');
    node.navigate('content2');
    equal($('.content1').length, 0);
    node.navigateBack();
    equal($('.content1').length, 1);
});
// Integration/nodes.tests.js
(function () {
    module('Integration.nodes', { teardown: Test.Integration.teardown });

    test("createNode binds pane to target element", function() {
        TC.createNode('#qunit-fixture', { path: 'Utilities/parent' });
        equal($('#qunit-fixture .parent .child .message').text(), 'test message');
    });

    test("appendNode appends wrapped pane to target element", function() {
        TC.appendNode('#qunit-fixture', { path: 'Utilities/parent' });
        equal($('#qunit-fixture div .parent .child .message').text(), 'test message');
    });

    test("createNode called from paneRendered model function renders", function() {
        TC.createNode('#qunit-fixture', { path: 'Utilities/dynamicParent' });
        equal($('#qunit-fixture .dynamicParent .child .message').text(), 'test message');
    });

    test("createNode inherits context from parent element", function () {
        TC.Events.spy = sinon.spy();
        TC.options.events = ['loadResources', 'createModel', 'initialiseModel', 'renderPane', 'renderComplete', 'spy', 'active', 'dispose'];
        
        TC.createNode('#qunit-fixture', { path: 'Utilities/dynamicParent' });
        ok(TC.Events.spy.calledTwice);
        equal(TC.Events.spy.firstCall.args[1], TC.Events.spy.secondCall.args[1]);
    });

    test("createNode returns populated Node object", function() {
        var node = TC.createNode('#qunit-fixture', { path: 'Utilities/parent' });
        equal(node.pane.path, '/Utilities/parent');
        equal(node.children.length, 1);
    });

    asyncTest("context.renderOperation resolves when render operation is complete", function () {
        expect(1);
        TC.options.synchronous = false;
        var context = TC.context();
        TC.createNode('#qunit-fixture', { path: 'Utilities/parent' }, null, context);
        $.when(context.renderOperation.promise)
            .done(function() {
                equal($('#qunit-fixture .parent .child .message').text(), 'test message');
                start();
            });
    });

    asyncTest("context.renderOperation includes dynamically added nodes", function () {
        expect(1);
        TC.options.synchronous = false;
        var context = TC.context();
        TC.createNode('#qunit-fixture', { path: 'Utilities/dynamicParent' }, null, context);
        $.when(context.renderOperation.promise)
            .done(function () {
                equal($('#qunit-fixture .dynamicParent .child .message').text(), 'test message');
                start();
            });
    });
})();

// Integration/Paths.tests.js
module('Integration.Paths', {
    setup: Test.Integration.createTestElement,
    teardown: Test.Integration.teardown
});

test("panes created with skipPath true inherit pane path from their parent", function() {
    TC.createNode('.test', { path: 'Paths/Subfolder/parent' });
    equal($('.parent').length, 1);
    equal($('.parent').children().length, 1);
    equal($('.parent .child').length, 1);
});
// Integration/PubSub.tests.js
module('Integration.PubSub', {
    setup: function () {
        Test.Integration.pubsubAsTribe();
        Test.Integration.createTestElement();
    }, teardown: Test.Integration.teardown
});

test("subscription in pane is executed", function() {
    TC.createNode('.test', { path: 'PubSub/subscriber' });
    Test.Integration.context.pubsub.publish('test', 'message');
    equal($('.subscriber').text(), 'message');
});

test("subscription is removed when pane is removed from DOM", function () {
    TC.createNode('.test', { path: 'PubSub/subscriber' });
    equal(Test.Integration.context.pubsub.subscribers.get('test').length, 1);
    $('.test').remove();
    equal(Test.Integration.context.pubsub.subscribers.get('test').length, 0);
});
// Integration/Transition.tests.js
(function () {
    module('Integration.Transition', {
        setup: Test.Integration.createTestElement,
        teardown: Test.Integration.teardown
    });

    test("transitioning node replaces pane with specified pane", function () {
        TC.createNode('.test', { path: 'Transition/pane1' });
        equal($('.pane1').length, 1);
        TC.transition(TC.nodeFor('.pane1')).to('Transition/pane2');
        equal($('.pane1').length, 0);
        equal($('.pane2').length, 1);
    });

    test("transitioning element replaces pane with specified pane", function () {
        TC.createNode('.test', { path: 'Transition/pane1' });
        equal($('.pane1').length, 1);
        TC.transition('.test').to('Transition/pane2');
        equal($('.pane1').length, 0);
        equal($('.pane2').length, 1);
    });

    test("specifying reverseTransitionIn pane option applies reverse transition", function () {
        if (Test.supportsTransitions) {
            TC.createNode('.test', { path: 'Transition/pane1', transition: 'slideLeft', reverseTransitionIn: true });
            ok($('.pane1').parent().hasClass('slideRight'));
        } else ok(true, "Test skipped - browser does not support CSS transitions.");
    });

    test("specifying reverse argument applies reverse transition", function () {
        if (Test.supportsTransitions) {
            TC.createNode('.test', { path: 'Transition/pane1', transition: 'slideLeft', reverseTransitionIn: true });
            TC.transition(TC.nodeFor('.pane1'), null, true).to('Transition/pane2');
            ok($('.pane1').parent().hasClass('slideRight'));
            ok($('.pane2').parent().hasClass('slideRight'));
        } else ok(true, "Test skipped - browser does not support CSS transitions.");
    });

    asyncTest("async transition to replaces pane with specified pane", function () {
        TC.options.synchronous = false;
        var context = TC.context();
        TC.createNode('.test', { path: 'Transition/pane1' }, null, context);
        $.when(context.renderOperation.promise).done(function() {
            equal($('.pane1').length, 1);
            $.when(TC.transition('.test').to('Transition/pane2')).done(function() {
                equal($('.pane1').length, 0);
                equal($('.pane2').length, 1);
                start();
            });
        });
    });
})();

// Integration/Tree.tests.js
(function () {
    var root;

    module('Integration.Tree', {
        setup: function() {
             Test.Integration.executeDefaultEvents('Tree/1');
             root = Test.state.pane.node.root;
        }, teardown: Test.Integration.teardown
    });

    test("tree renders", function () {
        equal($('.111').length, 1);
    });

    test("node is created and attached to pane", function () {
        ok(Test.state.pane.node);
        equal(Test.state.pane.path, '/Tree/1');
    });

    test("node is part of full node tree", function () {
        equal(root.children.length, 1);
        equal(root.children[0].children.length, 2);
        equal(root.children[0].children[1].pane.path, '/Tree/112');
    });

    test("node is removed from tree when pane element is remove from DOM", function () {
        equal(root.children[0].children.length, 2);
        $('.111').parent().remove();
        equal(root.children[0].children.length, 1);
    });

    test("pane changes when node is transitioned", function () {
        TC.transition(TC.nodeFor('.11')).to('12');
        equal(root.children[0].pane.path, '/Tree/12');
    });

    test("child nodes are removed when transitioned", function () {
        TC.transition(TC.nodeFor('.11')).to('12');
        equal(root.children[0].children.length, 0);
    });

    test("node is not replaced when transitioned", function() {
        var node = root.children[0];
        TC.transition(TC.nodeFor('.11')).to('12');
        equal(root.children[0], node);
    });

    test("node is replaced when element is transitioned", function() {
        var node = root.children[0];
        TC.transition($('.11').parent()).to('/Tree/12');
        equal(root.children.length, 1);
        notEqual(root.children[0], node);
        equal(root.children[0].pane.path, '/Tree/12');
    });
})();

// Integration/Events/active.tests.js
(function() {
    module('Integration.Events.active', {
        setup: function () { TC.Events.spy = sinon.spy(); },
        teardown: Test.Integration.teardown
    });

    var events = Test.Integration.testEventsUntil('active');

    test("event ends when pane element is removed from DOM", function () {
        Test.Integration.executeEvents(events, 'Events/basic');
        ok(TC.Events.spy.notCalled);
        $('.basic').parent().remove();
        ok(TC.Events.spy.called);
        equal(TC.Events.spy.firstCall.args[0].path, '/Events/basic');
    });

    test("child events end when parent pane element is removed from DOM", function () {
        Test.Integration.executeEvents(events, 'Events/basicParent');
        ok(TC.Events.spy.notCalled);
        $('.basicContainer').parent().remove();
        ok(TC.Events.spy.calledTwice);
        equal(TC.Events.spy.firstCall.args[0].path, '/Events/basicParent');
        equal(TC.Events.spy.secondCall.args[0].path, '/Events/basic');
    });
})();
// Integration/Events/createModel.tests.js
(function() {
    module('Integration.Events.createModel', {
        setup: function () { Test.Integration.executeEvents(Test.Integration.testEventsUntil('createModel'), 'Events/basic'); },
        teardown: Test.Integration.teardown
    });

    test("model is created and attached to pane object", function () {
        ok(Test.state.model);
        ok(Test.state.pane.model);
        equal(Test.state.model, Test.state.pane.model);
    });

})();
// Integration/Events/dispose.tests.js
(function() {
    module('Integration.Events.dispose', { teardown: Test.Integration.teardown });

    var events = Test.Integration.testEventsUntil('dispose');

    test("dispose is called once on model when pane element is removed from DOM using jQuery", function () {
        Test.Integration.executeEvents(events, 'Events/dispose');
        ok(!Test.state.disposeCalled);
        $('.dispose').parent().remove();
        equal(Test.state.disposeCallCount, 1);
    });

    // it seems DOMNodeRemoved sometimes fires asynchronously, this should probably be async - this will probably fail on other browsers
    test("dispose is called once on model when pane element is removed from DOM using native functions", function () {
        if (Test.supportsMutationEvents) {
            Test.Integration.executeEvents(events, 'Events/dispose');
            ok(!Test.state.disposeCalled);
            var element = document.querySelector('.dispose').parentNode;
            element.parentNode.removeChild(element);
            equal(Test.state.disposeCallCount, 1);
        } else
            ok(true, "Browser does not support DOM mutation events. Only elements removed with jQuery will be properly cleaned in this browser.");
    });

    test("dispose calls end on pubsub lifetime for each pane", function () {
        Test.Integration.pubsubAsMock();
        Test.Integration.executeEvents(events, 'Events/basicParent');
        $('.basicContainer').parent().remove();
        ok(Test.Integration.context.pubsub.end.calledTwice);
    });
})();
// Integration/Events/initialiseModel.tests.js
(function() {
    module('Integration.Events.initialiseModel', { teardown: Test.Integration.teardown });

    test("initialise function is called on model", function () {
        Test.Integration.executeEvents(Test.Integration.testEventsUntil('initialiseModel'), 'Events/basic');
        equal(Test.state.model.message, 'test message');
    });

    test("returning deferred from initialise makes pipeline wait", function () {
        Test.Integration.executeEvents(Test.Integration.testEventsUntil('initialiseModel'), 'Events/initialise');
        ok(TC.Events.spy.notCalled);
        Test.state.deferred.resolve();
        ok(TC.Events.spy.calledOnce);
    });

    test("rejecting deferred returned from initialise halts pipeline", function () {
        Test.Integration.executeEvents(Test.Integration.testEventsUntil('initialiseModel'), 'Events/initialise');
        Test.state.deferred.reject();
        ok(TC.Events.spy.notCalled);
    });
})();
// Integration/Events/loadResources.tests.js
(function() {
    module('Integration.Events.loadResources', {
        setup: function () { Test.Integration.executeEvents(['loadResources'], 'Events/basic'); },
        teardown: Test.Integration.teardown
    });

    test("loadResources loads model", function () {
        ok(Test.Integration.context.models['/Events/basic']);
    });

    test("loadResources loads template", function () {
        equal($('#template--Events-basic').length, 1);
    });

    test("loadResources loads style", function () {
        notEqual($('#__tribeStyles').html().indexOf('.basic'), -1);
    });

})();
// Integration/Events/renderComplete.tests.js
(function() {
    module('Integration.Events.renderComplete', { teardown: Test.Integration.teardown });

    var events = Test.Integration.testEventsUntil('renderComplete');

    test("renderComplete is called on model when single pane has rendered", function () {
        Test.Integration.executeEvents(events, 'Events/basic');
        ok(Test.state.model.renderCompleteCalled);
    });

    test("renderComplete is called on model when all panes in tree have rendered", function () {
        Test.Integration.executeEvents(events, 'Events/initialiseParent');
        ok(!Test.state.parentRenderCompleteCalled);
        Test.state.deferred.resolve();
        ok(Test.state.parentRenderCompleteCalled);
    });
    
    asyncTest("renderComplete is called on single model when in async mode", function () {
        expect(1);
        TC.options.synchronous = false;
        Test.state.renderComplete = function () {
            equal($('.message').text(), 'test message');
            start();
        };
        Test.Integration.executeEvents(events, 'Events/async');
    });

    asyncTest("renderComplete is called on all models when in async mode", function () {
        expect(1);
        TC.options.synchronous = false;
        Test.state.renderComplete = function () {
            equal($('.message').text(), 'test message');
            start();
        };
        Test.Integration.executeEvents(events, 'Events/asyncParent');
    });
})();
// Integration/Events/renderPane.tests.js
(function() {
    module('Integration.Events.renderPane', { teardown: Test.Integration.teardown });

    var events = Test.Integration.testEventsUntil('renderPane');

    test("pane template is rendered and bound to model", function () {
        Test.Integration.executeEvents(events, 'Events/basic');
        equal($('.message').text(), 'test message');
    });

    test("paneRendered is called on model", function() {
        Test.Integration.executeEvents(events, 'Events/basic');
        ok(Test.state.model.paneRenderedCalled);
    });

    test("child panes are rendered", function() {
        Test.Integration.executeEvents(events, 'Events/basicParent');
        equal($('.basic').length, 1);
    });

    test("model is passed data", function() {
        Test.Integration.executeEvents(events, 'Events/data', 'test message');
        equal($('.message').text(), 'test message');
    });

    asyncTest("paneRendered is called on model when in async mode", function () {
        expect(1);
        TC.options.synchronous = false;
        Test.state.paneRendered = function () {
            equal($('.message').text(), 'test message');
            start();
        };
        Test.Integration.executeEvents(events, 'Events/async');
    });
})();

        
    module = moduleFunction;
})();(function () {
    var moduleFunction = module;
    module = function(name, lifecycle) {
        return moduleFunction('Tribe.MessageHub.' + name, lifecycle);
    };
    
// Resources/helpers.js
function mockSignalR() {
    $.connection = {
        hubImplementation: {
            client: {},
            server: {
                publish: sinon.spy(),
                joinChannel: sinon.spy(),
                replayChannel: sinon.spy()
            },
            connection: {
                state: 1,
                stateChanged: sinon.spy()
            }
        },
        hub: {
            start: function() {
                return {
                    done: function(callback) {
                        callback();
                    }
                };
            }
        }
    };
    $.signalR = {
        connectionState: {
            connected: 1
        }
    };
    $.hubConnection = function (){ return { createHubProxies: function() { } }};
};

function mockPubSub() {
    return {
        publish: sinon.spy(),
        publishSync: sinon.spy(),
        subscribe: sinon.spy(),
        createLifetime: function () { return this; }
    };
}

function mockPublisher() {
    return { publishToServer: sinon.spy() };
}

//Tribe = window.Tribe || {};
//Tribe.PubSub = function() { };
//Tribe.PubSub.Lifetime = function() { };
// Client.tests.js
(function() {
    var hub;
    var pubsub;
    var publisher;

    var testMessage = { test: 'message' };
    var stringified = JSON.stringify(testMessage);

    module('Client', {
        setup: function () {
            mockSignalR();
            pubsub = mockPubSub();
            publisher = mockPublisher();
            hub = new Tribe.MessageHub.Client(pubsub, $.connection.hubImplementation, publisher);
        }
    });

    test("acceptServerMessage publishes message to pubsub", function() {
        $.connection.hubImplementation.client.acceptServerMessage(stringified);
        ok(pubsub.publish.calledOnce);
        ok(pubsub.publish.firstCall.args[0].server);
        equal(pubsub.publish.firstCall.args[0].test, 'message');
    });

    test("joinChannel subscribes to specified messages", function () {
        var options = { serverEvents: ['test', 'test2'] };
        TMH.initialise(pubsub);
        TMH.joinChannel('', options);
        ok(pubsub.subscribe.calledOnce);
        equal(pubsub.subscribe.firstCall.args[0], options.serverEvents);
    });

    test("joinChannel joins server channel", function () {
        TMH.initialise(pubsub);
        TMH.joinChannel('channel', true);
        ok($.connection.hubImplementation.server.joinChannel.calledOnce);
        equal($.connection.hubImplementation.server.joinChannel.args[0], 'channel');
    });

    test("joinChannel replays messages when second argument is true", function () {
        TMH.initialise(pubsub);
        TMH.joinChannel('channel', true);
        ok($.connection.hubImplementation.server.replayChannel.calledOnce);
        equal($.connection.hubImplementation.server.replayChannel.args[0], 'channel');
    });

    test("joinChannel replays messages when option passed", function() {
        var options = { replay: true };
        TMH.initialise(pubsub);
        TMH.joinChannel('channel', options);
        ok($.connection.hubImplementation.server.replayChannel.calledOnce);
        equal($.connection.hubImplementation.server.replayChannel.args[0], 'channel');
    });

    test("channel publishes specified messages to server", function () {
        var subscriber = getChannelSubscriber();
        subscriber(null, testMessage);
        ok(publisher.publishToServer.calledOnce);
        equal(publisher.publishToServer.firstCall.args[1], testMessage);
        equal(publisher.publishToServer.firstCall.args[2], undefined);
    });
    
    test("channel sets record option on server envelopes if option is set", function () {
        var subscriber = getChannelSubscriber(true);
        subscriber(null, testMessage);
        ok(publisher.publishToServer.calledOnce);
        equal(publisher.publishToServer.firstCall.args[2], true);
    });

    test("joinChannel and publishToServer calls are queued until connected", function () {
        var deferred = $.Deferred();
        $.connection.hub.start = function () { return deferred; };
        TMH.initialise(pubsub);
        TMH.joinChannel('channel');
        TMH.publishToServer('channel', {});
        ok($.connection.hubImplementation.server.joinChannel.notCalled);
        ok($.connection.hubImplementation.server.publish.notCalled);
        deferred.resolve();
        ok($.connection.hubImplementation.server.joinChannel.calledOnce);
        ok($.connection.hubImplementation.server.publish.calledOnce);
    });

    function getChannelSubscriber(record) {
        hub.joinChannel('1', { serverEvents: ['test'], record: record });
        return pubsub.subscribe.firstCall.args[1];
    }
})();
// Publisher.tests.js
(function() {
    var hub;
    var pubsub;
    var publisher;

    module('Publisher', {
        setup: function () {
            mockSignalR();
            pubsub = mockPubSub();
            publisher = new Tribe.MessageHub.Publisher($.connection.hubImplementation);
        }
    });

    test("message is not published if not connected", function() {
        $.connection.hubImplementation.connection.state = 0;
        publisher.publishToServer('', {});
        ok($.connection.hubImplementation.server.publish.notCalled);
    });
    
    test("queued messages are published when reconnected", function () {
        $.connection.hubImplementation.connection.state = 0;
        publisher.publishToServer('', {});
        publisher.publishToServer('', {});
        ok($.connection.hubImplementation.server.publish.notCalled);
        executeStateChanged(1);
        ok($.connection.hubImplementation.server.publish.calledTwice);
    });

    test("publishToServer ignores server messages", function () {
        publisher.publishToServer('', { server: true });
        ok($.connection.hubImplementation.server.publish.notCalled);
    });


    function executeStateChanged(newState) {
        $.connection.hubImplementation.connection.state = newState;
        var handler = $.connection.hubImplementation.connection.stateChanged.firstCall.args[0];
        return handler({ newState: newState });
    }
})();

        
    module = moduleFunction;
})();(function () {
    var moduleFunction = module;
    module = function(name, lifecycle) {
        return moduleFunction('Tribe.PubSub.' + name, lifecycle);
    };
    
// exceptions.tests.js
(function () {
    var pubsub;

    module('exceptions', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("when handleExceptions is true, publishSync should call all subscribers, even if there are exceptions", function () {
        var spy = sinon.spy();

        pubsub.subscribe("0", errorFunction);
        pubsub.subscribe("0", spy);

        pubsub.publishSync("0");

        ok(spy.called);
    });

    test("when handleExceptions is true, exceptionHandler is called when exception occurs in subscriber", function () {
        var oldHandler = Tribe.PubSub.options.exceptionHandler;
        Tribe.PubSub.options.exceptionHandler = sinon.spy();

        pubsub.subscribe("0", errorFunction);
        pubsub.publishSync("0");

        ok(Tribe.PubSub.options.exceptionHandler.called);
        Tribe.PubSub.options.exceptionHandler = oldHandler;
    });

    test("when handleExceptions is false, exceptions thrown in subscribers will be unhandled", function() {
        Tribe.PubSub.options.handleExceptions = false;

        raises(function() {
            pubsub.subscribe("0", errorFunction);
            pubsub.publishSync("0");
        });

        Tribe.PubSub.options.handleExceptions = true;
    });
    
    function errorFunction() {
        throw ('some error');
    }
})();

// Lifetime.tests.js
(function () {
    var pubsub;

    module('Lifetime', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("lifetime subscribers are called as normal", function() {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        var lifetime = pubsub.createLifetime();
        lifetime.subscribe("0", spy2);
        pubsub.publishSync("0");

        ok(spy1.called);
        ok(spy2.called);
    });
    
    test("lifetime subscribers are not called after end", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        var lifetime = pubsub.createLifetime();
        lifetime.subscribe("0", spy2);
        lifetime.end();
        pubsub.publishSync("0");

        ok(spy1.called);
        ok(spy2.notCalled);
    });

    test("lifetime handles hash of subscribers", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        var lifetime = pubsub.createLifetime();
        lifetime.subscribe({ "0": spy1, "1": spy2 });
        lifetime.end();
        pubsub.publishSync("0");
        pubsub.publishSync("1");

        ok(spy1.notCalled);
        ok(spy2.notCalled);
    });

    test("messages published through lifetime are published to other subscribers", function() {
        var spy = sinon.spy();

        pubsub.subscribe("0", spy);
        var lifetime = pubsub.createLifetime();
        lifetime.publishSync("0");

        ok(spy.calledOnce);
    });

    test("nested lifetime subscribers are removed by parent", function() {
        var spy = sinon.spy();

        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        lifetime2.subscribe("0", spy);
        lifetime1.end();
        pubsub.publishSync("0");

        ok(spy.notCalled);
    });

    test("parent lifetime subscribers are not removed by nested lifetimes", function() {
        var spy = sinon.spy();

        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        lifetime1.subscribe("0", spy);
        lifetime2.end();
        pubsub.publishSync("0");

        ok(spy.calledOnce);
    });

    test("publishing through nested lifetimes triggers subscribers on owner", function() {
        var spy = sinon.spy();

        pubsub.subscribe("0", spy);
        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        lifetime2.publishSync("0");

        ok(spy.calledOnce);
    });

    test("lifetime.owner returns containing PubSub object", function() {
        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        equal(lifetime1.owner, pubsub);
        equal(lifetime2.owner, pubsub);
    });
})();

// PubSub.publish.tests.js
(function () {
    var pubsub;

    module('core.publish', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("publish should call all subscribers for a message exactly once", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        pubsub.subscribe("0", spy2);

        pubsub.publishSync("0", "test");

        ok(spy1.calledOnce);
        ok(spy2.calledOnce);
    });

    test("publish should only call subscribers of the published message", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        pubsub.subscribe("1", spy2);

        pubsub.publishSync("0", "test");

        ok(spy1.called);
        equal(spy2.callCount, 0);
    });

    test("publish should call subscribers with data as first argument", function () {
        var spy = sinon.spy();

        pubsub.subscribe("0", spy);
        pubsub.publishSync("0", "1");

        ok(spy.calledWith("1"));
    });

    test("publish should publish asynchronously", function () {
        var setTimeout = stubSetTimeout();
        if (setTimeout) {
            var spy = sinon.spy();

            pubsub.subscribe("0", spy);
            pubsub.publish("0", "1");
            ok(setTimeout.calledOnce);

            setTimeout.restore();
        } else ok(true, "Unable to spy on window.setTimeout.");
    });

    test("publishSync should publish synchronously", function () {
        var setTimeout = stubSetTimeout();
        if (setTimeout) {
            var spy = sinon.spy();

            pubsub.subscribe("0", spy);
            pubsub.publishSync("0", "1");
            ok(setTimeout.notCalled);

            setTimeout.restore();
        } else ok(true, "Unable to spy on window.setTimeout.");
    });

    test("publish accepts evelope as first parameter", function () {
        var spy = sinon.spy();

        pubsub.subscribe('testMessage', spy);
        pubsub.publish({ topic: 'testMessage', data: 'test', sync: true });

        ok(spy.calledWith('test'));
    });
    
    function stubSetTimeout() {
        try {
            return sinon.stub(window, 'setTimeout');
        } catch (ex) { }
    }
})();

// PubSub.subscribe.tests.js
(function () {
    var pubsub;

    module('core.subscribe', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("subscribe method should return different tokens", function () {
        var token1 = pubsub.subscribe("0", function () { });
        var token2 = pubsub.subscribe("1", function () { });
        notEqual(token1, token2);
    });

    test('passing map of handlers to subscribe returns correct number of string tokens', function () {
        var tokens = pubsub.subscribe({
            'test': function () { },
            'test2': function () { }
        });
        equal(tokens.length, 2, 'Return type has correct length');
        ok(tokens[0].constructor === String);
        ok(tokens[1].constructor === String);
    });

    test('passing map of handlers to subscribe correctly subscribes messages', function () {
        var spy1 = sinon.spy(), spy2 = sinon.spy();
        pubsub.subscribe({
            'test': spy1,
            'test2': spy2
        });

        pubsub.publishSync('test');
        ok(spy1.called, "First subscription successful");

        pubsub.publishSync('test2');
        ok(spy2.called, "Second subscription successful");
    });

    test('passing array of handlers to subscribe returns correct number of string tokens', function () {
        var tokens = pubsub.subscribe(['test', 'test2'], function () { });
        equal(tokens.length, 2, 'Return type has correct length');
        ok(tokens[0].constructor === String);
        ok(tokens[1].constructor === String);
    });

    test('passing array of handlers to subscribe correctly subscribes messages', function () {
        var spy = sinon.spy();
        pubsub.subscribe(['test', 'test2'], spy);

        pubsub.publishSync('test');
        pubsub.publishSync('test2');
        ok(spy.calledTwice, "Both subscriptions triggered");
    });
})();

// PubSub.unsubscribe.tests.js
(function () {
    var pubsub;

    module('core.unsubscribe', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("unsubscribe method should return token when successful", function () {
        var token = pubsub.subscribe("0");
        var result = pubsub.unsubscribe(token);
        equal(result, token);
    });

    test("unsubscribe method should return false when unsuccesful", function () {
        var result = pubsub.unsubscribe("0");
        equal(result, false);

        // now let's try unsubscribing the same method twice
        var token = pubsub.subscribe("0");
        pubsub.unsubscribe(token);
        equal(pubsub.unsubscribe(token), false);
    });

    test('passing array of tokens to unsubscribe correctly unsubscribes messages', function () {
        var spy1 = sinon.spy(), spy2 = sinon.spy();
        var tokens = pubsub.subscribe({
            'test': spy1,
            'test2': spy2
        });
        pubsub.unsubscribe(tokens);

        pubsub.publishSync('test');
        ok(!spy1.called, "First subscription successful");

        pubsub.publishSync('test2');
        ok(!spy2.called, "Second subscription successful");
    });
})();

// Saga.tests.js
(function () {
    var spy;
    var definition;
    var pubsub;

    module('Saga', {
        setup: function () {
            pubsub = new Tribe.PubSub({ sync: true });
            definition = createDefinition();
            spy = sinon.spy();
        }
    });

    test("constructor arguments are passed to definition constructor", function () {
        expect(3);
        var s = new Tribe.PubSub.Saga(pubsub, constructor, 'arg1', 'arg2');
        function constructor(saga, arg1, arg2) {
            equal(saga.pubsub.owner, pubsub);
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });

    test("arguments passed to pubsub.startSaga are passed to definition constructor", function () {
        expect(3);
        var s = pubsub.startSaga(constructor, 'arg1', 'arg2');
        function constructor(saga, arg1, arg2) {
            equal(saga.pubsub.owner, pubsub);
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });

    test("arguments passed to lifetime.startSaga are passed to definition constructor", function () {
        expect(3);
        var s = pubsub.createLifetime().startSaga(constructor, 'arg1', 'arg2');
        function constructor(saga, arg1, arg2) {
            equal(saga.pubsub.owner, pubsub);
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });

    test("handler is executed with correct arguments when topic is published", function () {
        definition.handles = { 'testTopic': spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('testTopic', 'data');

        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'data');
        equal(spy.firstCall.args[1].data, 'data');
        equal(spy.firstCall.args[2], saga);
    });

    test("onstart handler is executed when saga is started", function () {
        definition.handles = { onstart: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition);
        ok(spy.notCalled);
        saga.start();
        ok(spy.calledOnce);
    });

    test("onstart is called with argument passed to start", function () {
        definition.handles = { onstart: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start('arg');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'arg');
        equal(spy.firstCall.args[1], saga);
    });

    test("onend handler is executed when saga is ended", function () {
        definition.handles = { onend: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        ok(spy.notCalled);
        saga.end();
        ok(spy.calledOnce);
    });

    test("onend handler is called wtih argument passed to end", function () {
        definition.handles = { onend: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        saga.end('arg');
        equal(spy.firstCall.args[0], 'arg');
        equal(spy.firstCall.args[1], saga);
    });

    test("onstart and onend handlers are not executed when topics are published", function () {
        definition.handles = { onstart: spy, onend: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('onstart');
        pubsub.publish('onend');
        ok(spy.calledOnce);
    });

    test("startChild starts child and adds to children", function () {
        var child = createDefinition({ onstart: spy });
        var saga = new Tribe.PubSub.Saga(pubsub, definition);
        saga.startChild(child);
        ok(spy.calledOnce);
        equal(saga.children.length, 1);
    });

    test("startChild passes arguments to definition constructor", function () {
        expect(2);
        var child = function(childSaga, arg1, arg2) {
            this.handles = {
                onstart: function() {
                    equal(arg1, 'arg1');
                    equal(arg2, 2);
                }
            };
        };
        var saga = new Tribe.PubSub.Saga(pubsub, definition);
        saga.startChild(child, 'arg1', 2);
    });

    test("end calls end on any children with data passed", function () {
        var child = createDefinition({ onend: spy });
        var saga = new Tribe.PubSub.Saga(pubsub, definition);
        saga.startChild(child);
        saga.end('arg');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'arg');
    });

    test("Saga ends when null handler is executed", function () {
        definition.handles = { 'endTopic': null, onend: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('endTopic');
        ok(definition.handles.onend.calledOnce);
    });

    test("Child saga is started when child handler is executed", function () {
        definition.handles = {
            'startChild': {
                'childTopic': spy
            }
        };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('childTopic');
        ok(spy.notCalled);
        pubsub.publish('startChild');
        pubsub.publish('childTopic');
        ok(spy.calledOnce);
    });

    test("Children are ended when parent message is received", function () {
        definition.handles = {
            'startChild': {
                'childTopic': spy
            },
            'parentTopic': function () { }
        };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('startChild');
        pubsub.publish('childTopic');
        pubsub.publish('parentTopic');
        pubsub.publish('childTopic');
        ok(spy.calledOnce);
    });

    test("Children are not ended when parent message is received if endsChildrenExplicitly is set", function () {
        definition.handles = {
            'startChild': {
                'childTopic': spy
            },
            'parentTopic': function () { }
        };
        definition.endsChildrenExplicitly = true;
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('startChild');
        pubsub.publish('childTopic');
        pubsub.publish('parentTopic');
        pubsub.publish('childTopic');
        ok(spy.calledTwice);
    });

    function createDefinition(handlers) {
        return {
            pubsub: pubsub,
            handles: handlers
        };
    }
})();

// subscribeOnce.tests.js
(function () {
    var pubsub;

    module('subscribeOnce', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    // add some subscribers around the subscribeOnce to ensure it is unsubscribed correctly.
    test('subscribeOnce publishes message to single subscriber only once', function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        var spy3 = sinon.spy();

        pubsub.subscribe('test', spy1);
        pubsub.subscribeOnce('test', spy2);
        pubsub.subscribe('test', spy3);
        pubsub.publishSync('test');
        pubsub.publishSync('test');
        ok(spy1.calledTwice);
        ok(spy2.calledOnce);
        ok(spy3.calledTwice);
    });

    test("subscribeOnce publishes message to map of subscribers only once", function () {
        var spy = sinon.spy();
        pubsub.subscribeOnce({ 'test1': spy, 'test2': spy });
        pubsub.publishSync('test1');
        pubsub.publishSync('test1');
        pubsub.publishSync('test2');
        ok(spy.calledOnce);
    });

    test("subscribeOnce publishes message to array of subscribers only once", function () {
        var spy = sinon.spy();
        pubsub.subscribeOnce([ 'test1', 'test2'], spy);
        pubsub.publishSync('test1');
        pubsub.publishSync('test1');
        pubsub.publishSync('test2');
        ok(spy.calledOnce);
    });

    test("subscribeOnce functions correctly in a lifetime", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        var spy3 = sinon.spy();

        pubsub.subscribe('test', spy1);
        var lifetime = pubsub.createLifetime();
        lifetime.subscribeOnce('test', spy2);
        lifetime.subscribe('test', spy3);
        
        pubsub.publishSync('test');
        pubsub.publishSync('test');
        lifetime.end();
        pubsub.publishSync('test');
        
        ok(spy1.calledThrice);
        ok(spy2.calledOnce);
        ok(spy3.calledTwice);
    });
})();

// SubscriberList.tests.js
(function() {
    var list;

    module("SubscriberList", {
        setup: function () { list = new Tribe.PubSub.SubscriberList(); }
    });

    test("add returns consecutive tokens", function () {
        equal(list.add(), "0");
        equal(list.add(), "1");
    });

    test("remove returns token if removed", function() {
        var token = list.add("0");
        equal(list.remove(token), token);
    });

    test("remove returns false if not removed", function () {
        list.add("0");
        equal(list.remove("1"), false);
    });

    test("get returns subscribers to specific topic", function() {
        list.add("0", "0");
        list.add("0", "1");
        list.add("2", "2");

        var subscribers = list.get("0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("get includes global wildcard", function () {
        list.add("0", "0");
        list.add("*", "1");
        list.add("1", "2");

        var subscribers = list.get("0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("global wildcard matches all topics", function() {
        list.add("*", "1");
        equal(list.get("0").length, 1);
        equal(list.get("00").length, 1);
        equal(list.get("0.0").length, 1);
        equal(list.get("0.0.0").length, 1);
    });

    test("get includes child wildcard", function () {
        list.add("0.0", "0");
        list.add("0.*", "1");
        list.add("0.1", "2");

        var subscribers = list.get("0.0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("get includes embedded wildcard", function () {
        list.add("0.0.0", "0");
        list.add("0.*.0", "1");
        list.add("0.1.0", "2");

        var subscribers = list.get("0.0.0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("publish matches topics correctly", function () {
        list.add("test", {});
        list.add("testtest", {});
        list.add("1test", {});
        list.add("test1", {});
        list.add("1test1", {});

        equal(list.get("test").length, 1);
        equal(list.get("testtest").length, 1);
        equal(list.get("1test").length, 1);
        equal(list.get("test1").length, 1);
        equal(list.get("1test1").length, 1);
    });
})();

// utils.tests.js
(function () {
    module("utils");

    var utils = Tribe.PubSub.utils;
    // these tests taken from the underscore library. Licensing at http://underscorejs.org.

    test("each", function () {
        utils.each([1, 2, 3], function (num, i) {
            equal(num, i + 1, 'each iterators provide value and iteration count');
        });

        var answers = [];
        utils.each([1, 2, 3], function (num) { answers.push(num * this.multiplier); }, { multiplier: 5 });
        equal(answers.join(', '), '5, 10, 15', 'context object property accessed');

        answers = [];
        var obj = { one: 1, two: 2, three: 3 };
        obj.constructor.prototype.four = 4;
        utils.each(obj, function (value, key) { answers.push(key); });
        equal(answers.join(", "), 'one, two, three', 'iterating over objects works, and ignores the object prototype.');
        delete obj.constructor.prototype.four;

        answers = 0;
        utils.each(null, function () { ++answers; });
        equal(answers, 0, 'handles a null properly');
    });

    test('map', function () {
        var doubled = utils.map([1, 2, 3], function (num) { return num * 2; });
        equal(doubled.join(', '), '2, 4, 6', 'doubled numbers');

        var tripled = utils.map([1, 2, 3], function (num) { return num * this.multiplier; }, { multiplier: 3 });
        equal(tripled.join(', '), '3, 6, 9', 'tripled numbers with context');

        var ifnull = utils.map(null, function () { });
        ok(utils.isArray(ifnull) && ifnull.length === 0, 'handles a null properly');
    });

    test('applyToConstructor', function () {
        expect(2);
        
        // current implementation does not support Date
        //deepEqual(
        //    utils.applyToConstructor(Date, [2008, 10, 8, 00, 16, 34, 254]),
        //    new Date(2008, 10, 8, 00, 16, 34, 254));

        utils.applyToConstructor(constructor, ['arg1', 'arg2']);
        
        function constructor(arg1, arg2) {
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });
})();


        
    module = moduleFunction;
})();
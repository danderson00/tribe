
window.eval("\n\nT.scriptEnvironment = { resourcePath: '/fixture' };\n\nT.registerModel(function (pane) {\n    this.fixture = pane.data;\n});\n\n//@ sourceURL=http://Panes/fixture.js");


window.eval("\n\nT.scriptEnvironment = { resourcePath: '/layout' };\n\nT.registerModel(function (pane) {\n    var self = this,\n        saga,\n        channel = pane.pubsub.channel('__test').connect();\n\n    this.initialise = function () {\n        return T.services('Tests').invoke().then(function (fixture) {\n            saga = channel.startSaga(null, 'session', fixture);\n            self.fixture = fixture;\n        });        \n    };\n\n    //this.renderComplete = function () {\n    //    channel.publish('test.run');\n    //};\n\n    //this.tests = ko.observableArray();\n\n    this.run = function () {\n    //    self.tests.splice(0, self.tests().length);\n        channel.publish('test.run');\n    };\n\n    //channel.subscribe('test.complete', function (test) {\n    //    self.tests.push(test);\n    //});\n\n    //channel.subscribe('test.error', function (error) {\n    //    self.tests.push(testFromError(error));\n    //});\n\n    //function testFromError(error) {\n    //    return {\n    //        module: 'Error running tests',\n    //        failed: 1,\n    //        passed: 0,\n    //        total: 1,\n    //        assertions: [\n    //            {\n    //                message: error,\n    //                result: false\n    //            }\n    //        ]\n    //    };\n    //}\n});\n\n//@ sourceURL=http://Panes/layout.js");


window.eval("\n\nT.scriptEnvironment = { resourcePath: '/list' };\n\nT.registerModel(function (pane) {\n    this.tests = flatten(pane.data);\n\n    // should write a test for this\n    function flatten(fixture) {\n        var tests = fixture.tests,\n            fixtures = fixture.fixtures;\n\n        for (var fixtureName in fixtures)\n            if(fixtures.hasOwnProperty(fixtureName))\n                tests = tests.concat(flatten(fixtures[fixtureName]));\n        \n        return tests;\n        //return _.flatten(_.map(fixture.fixtures, flatten), fixture.tests);\n    }\n});\n\n//@ sourceURL=http://Panes/list.js");


window.eval("\n\nT.scriptEnvironment = { resourcePath: '/test' };\n\nT.registerModel(function (pane) {\n    var self = this,\n        test = pane.data;\n\n    this.test = test;\n\n    this.error = ko.computed(function () {\n        var error = test.error();\n        return error && error.replace(/\\n/g, '<br/>');\n    });\n\n    this.fixture = test.fixture ?\n        test.fixture.join('.') :\n        'No fixture';\n\n    this.showDetails = ko.observable(test.state() === 'failed');\n\n    this.toggleDetails = function () {\n        self.showDetails(!self.showDetails());\n    };\n\n});\n\n//@ sourceURL=http://Panes/test.js");


//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<div data-bind="foreach: fixture.fixtureArray">\n    <div data-bind="pane: \'fixture\', data: $data"></div>\n</div>\n<div data-bind="foreach: fixture.tests">\n    <div data-bind="pane: \'test\', data: $data"></div>\n</div>', 'template--fixture');

//
window.__appendTemplate('\n<button data-bind="click: run">Run</button>\n<div data-bind="pane: \'fixture\', data: fixture"></div>', 'template--layout');

//
window.__appendTemplate('\n<div data-bind="foreach: tests">\n    <div data-bind="pane: \'test\', data: $data"></div>\n</div>', 'template--list');

//
window.__appendTemplate('\n<div class="test" data-bind="css: { pass: test.state() === \'passed\', fail: test.state() === \'failed\' }">\n    <div class="summary" data-bind="click: toggleDetails">\n        <span class="fixture" data-bind="text: fixture"></span>: \n        <span class="testName" data-bind="text: test.name"></span> - \n        <span class="testState" data-bind="text: test.state() || \'not run\'"></span>\n    </div>\n    <div class="details" data-bind="visible: showDetails">\n        <div>Filename: <span data-bind="text: test.filename"></span></div>\n        <div data-bind="html: error"></div>\n    </div>\n</div>', 'template--test');

//
window.__appendStyle = function (content) {
    var element = document.getElementById('__tribeStyles');
    if (!element) {
        element = document.createElement('style');
        element.className = '__tribe';
        element.id = '__tribeStyles';
        document.getElementsByTagName('head')[0].appendChild(element);
    }

    if(element.styleSheet)
        element.styleSheet.cssText += content;
    else
        element.appendChild(document.createTextNode(content));
};//
window.__appendStyle('body{font-family:"Helvetica Neue Light","HelveticaNeue-Light","Helvetica Neue",Calibri,Helvetica,Arial,sans-serif}');

//
window.__appendStyle('.test{border:2px solid #dedede;margin-top:1px}.test.fail{border:2px solid #ffdede}.test.pass{border:2px solid #deffde}.test .summary{background:#dedede;padding:2px 10px;cursor:pointer}.test .summary .testName{color:black}.test.pass .summary{background:#deffde}.test.pass .summary .fixture{color:#060;font-weight:bold}.test.pass .summary .testState{color:#0F0;font-weight:bold}.test.fail .summary{background:#ffdede}.test.fail .summary .fixture{color:#A00;font-weight:bold}.test.fail .summary .testState{color:#F00;font-weight:bold}.details{margin:0;padding:5px;background:white}');

window.eval("\n\nT.scriptEnvironment = { resourcePath: '/session' };\n\nT.registerSaga(function (saga) {\n    var fixture;\n\n    saga.handles = {\n        onstart: function (data) {\n            fixture = extendFixture(data);\n        },\n        'test.complete': function (test) {\n            updateTestFrom(test);\n        }\n    };\n\n    function updateTestFrom(update) {\n        var test = findTest(update);\n        test.state(update.state);\n        test.error(update.error);\n        test.duration(update.duration);\n    }\n\n    function extendFixture(fixture) {\n        var fixtures = $.map(fixture.fixtures, function (value) { return extendFixture(value); });\n        fixture.fixtureArray = ko.observableArray(fixtures);\n        fixture.tests = ko.observableArray($.map(fixture.tests, extendTest));\n        return fixture;\n    }\n\n    function extendTest(test) {\n        test.state = ko.observable(test.state);\n        test.error = ko.observable(test.error);\n        test.duration = ko.observable(test.duration);\n        return test;\n    }\n\n    function findTest(test) {\n        var testFixture = findFixture(test.fixture);\n        return $.grep(testFixture.tests(), function (currentTest) {\n            return currentTest.name === test.name;\n        })[0];\n    }\n\n    function findFixture(spec) {\n        var current = fixture;\n        // need a reduce function\n        $.each(spec, function (index, title) {\n            current = current.fixtures[title];\n        });\n        return current;\n    }\n});\n\n\n//@ sourceURL=http://Sagas/session.js");

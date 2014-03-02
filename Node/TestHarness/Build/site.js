
window.eval("\n\nT.scriptEnvironment = { resourcePath: '/layout' };\n\nT.registerModel(function (pane) {\n    var self = this,\n        channel = pane.pubsub.channel('test').connect();\n\n    this.renderComplete = function () {\n        channel.publish('test.run');\n    };\n\n    this.tests = ko.observableArray();\n\n    this.run = function () {\n        self.tests.splice(0, self.tests().length);\n        channel.publish('test.run');\n    };\n\n    channel.subscribe('test.done', function (test) {\n        self.tests.push(test);\n    });\n\n    channel.subscribe('test.error', function (error) {\n        self.tests.push(testFromError(error));\n    });\n\n    function testFromError(error) {\n        return {\n            module: 'Error running tests',\n            failed: 1,\n            passed: 0,\n            total: 1,\n            assertions: [\n                {\n                    message: error,\n                    result: false\n                }\n            ]\n        };\n    }\n});\n\n//@ sourceURL=tribe://Panes/layout.js");


window.eval("\n\nT.scriptEnvironment = { resourcePath: '/test' };\n\nT.registerModel(function (pane) {\n    var self = this,\n        test = pane.data;\n\n    this.test = test;\n    this.pass = test.failed === 0;\n    this.result = this.pass ? \n        'Passed (' + test.total + ')' :\n        'Failed (' + test.failed + '/' + test.total + ')';\n\n    this.showAssertions = ko.observable(this.pass !== true);\n\n    this.toggleAssertions = function () {\n        self.showAssertions(!self.showAssertions());\n    };\n\n    this.formatAssertion = function (assertion) {\n        var description = '';\n        if (assertion.message)\n            description += assertion.message.replace(/\\n/g, '<br/>');\n        else\n            description += assertion.result ? 'Passed' : 'Failed';\n        if (assertion.expected)\n            description += '<br/>Expected: ' + JSON.stringify(assertion.expected, null, 2);\n        if (assertion.actual && !assertion.result)\n            description += '<br/>Actual: ' + JSON.stringify(assertion.actual, null, 2);\n        return description;\n    };\n});\n\n//@ sourceURL=tribe://Panes/test.js");


//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<button data-bind="click: run">Run</button>\n<div data-bind="foreach: tests">\n    <div data-bind="pane: \'test\', data: $data"></div>\n</div>', 'template--layout');

//
window.__appendTemplate('\n<div class="test" data-bind="css: { pass: pass }">\n    <div data-bind="click: toggleAssertions">\n        <span data-bind="text: test.module"></span>: \n        <span data-bind="text: test.name"></span> - \n        <span data-bind="text: result"></span>\n    </div>\n\n    <ul class="assertions" data-bind="foreach: test.assertions, visible: showAssertions">\n        <li>\n            <div data-bind="css: { pass: result }">&nbsp;</div>\n            <span data-bind="html: $root.formatAssertion($data)"></span>\n        </li>\n    </ul>\n</div>', 'template--test');

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
window.__appendStyle('.test{border:2px solid salmon;margin-top:10px}.test.pass{border:2px solid lightgreen}.test>div{background:salmon;padding:2px 10px;cursor:pointer}.test.pass>div{background:lightgreen}.assertions{list-style:none;margin:0;padding:5px}.assertions li div{display:inline-block;width:5px;background:red}.assertions li div.pass{background:green}');